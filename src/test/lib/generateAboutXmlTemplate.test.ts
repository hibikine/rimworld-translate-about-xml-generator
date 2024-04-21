import * as assert from 'assert';
import { generateAboutXmlTemplate } from '../../lib/generateAboutXmlTemplate';

suite('generateAboutXmlTemplate', () => {
  test('generateAboutXmlTemplate', () => {
    const result = generateAboutXmlTemplate({
      name: 'Test Mod',
      packageId: 'testmod.test',
      steamId: '123456789',
      author: 'Test Author',
    });
    assert.strictEqual(
      result,
      `<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>Test Mod 日本語翻訳</name>
    <author>Hibikine Kage</author>
    <supportedVersions>
        <li>1.5</li>
    </supportedVersions>
    <packageId>works.hikage.testmod.test</packageId>
    <description>Test Mod 日本語翻訳</description>
    <modDependencies>
        <li>
            <packageId>testmod.test</packageId>
            <displayName>Test Mod</displayName>
            <steamWorkshopUrl>https://steamcommunity.com/workshop/filedetails/?id=123456789</steamWorkshopUrl>
        </li>
    </modDependencies>
    <loadAfter>
        <li>testmod.test</li>
    </loadAfter>
</ModMetaData>`,
    );
  });
});
