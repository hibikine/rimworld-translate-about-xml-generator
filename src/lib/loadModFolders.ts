import * as vscode from 'vscode';
import { XMLParser } from 'fast-xml-parser';
import fs from 'node:fs/promises';
import path from 'node:path';

export type Mod = {
  name: string;
  author: string;
  steamId?: string;
  packageId: string;
};

const parser = new XMLParser({ ignoreDeclaration: true });

const toXml = (str: string): unknown => parser.parse(str) as unknown;

const parseXml = (xml: unknown): Mod => {
  if (typeof xml !== 'object' || xml === null) {
    throw new Error('Invalid XML');
  }
  if (!('ModMetaData' in xml)) {
    throw new Error('Invalid XML');
  }
  const mod = xml['ModMetaData'];
  if (typeof mod !== 'object' || mod === null) {
    throw new Error('Invalid XML');
  }
  if (!('name' in mod) || typeof mod['name'] !== 'string') {
    throw new Error('Invalid XML');
  }
  if (!('author' in mod) || typeof mod['author'] !== 'string') {
    throw new Error('Invalid XML');
  }
  if (!('packageId' in mod) || typeof mod['packageId'] !== 'string') {
    throw new Error('Invalid XML');
  }
  return {
    name: mod['name'],
    author: mod['author'],
    packageId: mod['packageId'],
  };
};

let modCache: null | Mod[] = null;

export const loadModFolders = async (): Promise<Mod[]> => {
  console.log('Loading mod folders...');
  // get 'rimworld-translate-about-xml-generator.modDirectory' from vscode configuration
  const modDirectory =
    vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .get<string>('modDirectory') ??
    'C:/Program Files (x86)/Steam/steamapps/common/RimWorld/Mods';
  console.log(modDirectory);
  const steamWorkshopDirectory =
    vscode.workspace
      .getConfiguration('rimworld-translate-about-xml-generator')
      .get<string>('steamWorkshopDirectory') ??
    'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
  console.log(steamWorkshopDirectory);
  const mods = (
    await Promise.all(
      [modDirectory, steamWorkshopDirectory].map(
        async (dir, i): Promise<[] | Mod[]> => {
          try {
            const files = await fs.readdir(dir, { withFileTypes: true });
            return (
              await Promise.all(
                files
                  .filter((dirent) => dirent.isDirectory())
                  .map(async (dirent): Promise<Mod | null> => {
                    {
                      try {
                        const xmlText = await fs.readFile(
                          path.join(dir, dirent.name, 'About/About.xml'),
                          {
                            flag: 'r',
                            encoding: 'utf-8',
                          },
                        );
                        const xml = toXml(xmlText);
                        const mod = parseXml(xml);

                        // if i === 0, it's a workshop mod
                        if (i === 1) {
                          const steamId = dirent.name;
                          mod.steamId = steamId;
                        }
                        return mod;
                      } catch (e) {
                        console.error(
                          `Error reading file ${dir}/${dirent.name}/About/About.xml: ${e as string}`,
                        );
                        return null;
                      }
                    }
                  }),
              )
            ).filter((v): v is Mod => v !== null);
          } catch (e) {
            console.error(`Error reading directory ${dir}: ${e as string}`);
            return [];
          }
        },
      ),
    )
  ).flat();
  modCache = mods;
  return mods;
};

export const getModFolders = async (): Promise<Mod[]> => {
  return modCache || (await loadModFolders());
};
