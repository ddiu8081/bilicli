interface AppOptions {
  badge: boolean
  rank: boolean
}

declare namespace NodeJS {
  export interface Global {
    appOptions: AppOptions;
  }
}

declare var appOptions: AppOptions;