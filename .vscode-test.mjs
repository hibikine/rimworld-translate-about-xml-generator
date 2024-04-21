import { defineConfig } from '@vscode/test-cli';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.test',
});

console.log(process.env.STEAM_WORKSHOP_DIRECTORY);
console.log(process.env.MOD_DIRECTORY);

export default defineConfig({
  files: 'out/test/**/*.test.js',
  env: {
    NODE_ENV: 'test',
    STEAM_WORKSHOP_DIRECTORY: process.env.STEAM_WORKSHOP_DIRECTORY,
    MOD_DIRECTORY: process.env.MOD_DIRECTORY,
  },
});
