declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        TZ?: string;
        MOD_DIRECTORY?: string;
        STEAM_WORKSHOP_DIRECTORY?: string;
        AUTHOR_NAME?: string;
        AUTHOR_ID?: string;
      }
    }
  }
}
