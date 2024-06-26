import * as vscode from 'vscode';
import { loadModFolders } from './lib/loadModFolders';
import { generateAboutXmlTemplate } from './lib/generateAboutXmlTemplate';

export function activate(context: vscode.ExtensionContext) {
  console.log('RimWorld Translate About.xml Generator is now active.');
  console.log('Loading mod folder...');
  loadModFolders();

  // on change extension's settings, reload mod folder
  vscode.workspace.onDidChangeConfiguration(() => {
    console.log('Configuration changed, reloading mod folder...');
    loadModFolders();
  });

  const generateAboutXmlDisposable = vscode.commands.registerCommand(
    'rimworld-translate-about-xml-generator.generateAboutXml',
    async () => {
      const mods = await loadModFolders();
      const { mod } = (await vscode.window.showQuickPick(
        mods.map((mod) => ({
          label: mod.name,
          description: `[${mod.packageId}${mod.steamId ?? `- ${mod.steamId}`}] by ${mod.author}`,
          mod,
        })),
        {
          matchOnDescription: true,
          placeHolder: 'Select a mod to generate About.xml',
        },
      )) ?? { mod: null };
      if (!mod) {
        console.log('cancelled');
        return;
      }
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log('editor does not exist');
        return;
      }
      const template = generateAboutXmlTemplate(mod);
      editor.edit((editBuilder) => {
        editBuilder.replace(editor.selection, template);
      });
    },
  );

  const reloadModFoldersDisposable = vscode.commands.registerCommand(
    'rimworld-translate-about-xml-generator.reloadModFolders',
    loadModFolders,
  );

  context.subscriptions.push(generateAboutXmlDisposable);
  context.subscriptions.push(reloadModFoldersDisposable);
}

export function deactivate() {}
