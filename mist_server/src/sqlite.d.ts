declare module 'sqlite' {
    import sqlite3 from 'sqlite3';
  
    export interface ISqliteOptions {
      filename: string;
      driver: any;
    }
  
    export function open(options: ISqliteOptions): Promise<any>;
  }