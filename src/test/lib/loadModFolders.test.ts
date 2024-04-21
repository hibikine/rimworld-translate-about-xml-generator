import * as assert from 'assert';
import * as vscode from 'vscode';
import dotenv from 'dotenv';
import { loadModFolders } from '../../lib/loadModFolders';

dotenv.config();

suite('loadModFolders', () => {
  test('loadModFolders', async () => {
    console.log(`MOD_DIRECTORY: ${process.env.MOD_DIRECTORY}`);
    console.log(
      `STEAM_WORKSHOP_DIRECTORY: ${process.env.STEAM_WORKSHOP_DIRECTORY}`,
    );

    if (!process.env.MOD_DIRECTORY) {
      process.env.MOD_DIRECTORY =
        'C:/Program Files (x86)/Steam/steamapps/common/RimWorld/Mods';
    }
    if (!process.env.STEAM_WORKSHOP_DIRECTORY) {
      process.env.STEAM_WORKSHOP_DIRECTORY =
        'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
    }

    console.log(`MOD_DIRECTORY: ${process.env.MOD_DIRECTORY}`);
    console.log(
      `STEAM_WORKSHOP_DIRECTORY: ${process.env.STEAM_WORKSHOP_DIRECTORY}`,
    );

    await vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .update(
        'modDirectory',
        process.env.MOD_DIRECTORY,
        vscode.ConfigurationTarget.Global,
      );
    await vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .update(
        'steamWorkshopDirectory',
        process.env.STEAM_WORKSHOP_DIRECTORY,
        vscode.ConfigurationTarget.Global,
      );

    const mods = await loadModFolders();
    assert.strictEqual(mods instanceof Array, true);

    const mod = mods[0];
    assert.strictEqual(mod.name !== '', true);
    assert.strictEqual(mod.author !== '', true);
    assert.strictEqual(mod.packageId !== '', true);

    const mod2 = mods.find((mod) => mod.steamId !== undefined);
    assert.strictEqual(mod2?.steamId !== '', true);
  });
});
