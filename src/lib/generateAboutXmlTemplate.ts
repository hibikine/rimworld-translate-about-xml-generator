import { Mod } from './loadModFolders';

export function generateAboutXmlTemplate(mod: Mod) {
  return `<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>${mod.name} 日本語翻訳</name>
    <author>Hibikine Kage</author>
    <supportedVersions>
        <li>1.5</li>
    </supportedVersions>
    <packageId>works.hikage.${mod.packageId}</packageId>
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
