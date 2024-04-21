import * as vscode from 'vscode';
import { Mod } from './loadModFolders';

export function generateAboutXmlTemplate(mod: Mod): string {
  const authorName =
    vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .get<string>('authorName') || 'Author Name';
  const authorId =
    vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .get<string>('authorId') || 'translate.mod';
  return `<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>${mod.name} 日本語翻訳</name>
    <author>${authorName}</author>
    <supportedVersions>
        <li>1.5</li>
    </supportedVersions>
    <packageId>${authorId}.${mod.packageId}</packageId>
    <description>${mod.name} 日本語翻訳</description>
    <modDependencies>
        <li>
            <packageId>${mod.packageId}</packageId>
            <displayName>${mod.name}</displayName>
            ${mod.steamId ? `<steamWorkshopUrl>https://steamcommunity.com/workshop/filedetails/?id=${mod.steamId}</steamWorkshopUrl>` : ''}
        </li>
    </modDependencies>
    <loadAfter>
        <li>${mod.packageId}</li>
    </loadAfter>
</ModMetaData>`;
}
