import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

import slash from 'slash';

import { AppConfig } from "../../environments/environment";
import * as bookshelf from 'bookshelf';

@Injectable()
export class ElectronService {

  isElectronDesktop: boolean;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  bookshelf: typeof bookshelf;

  constructor() {

    this.isElectronDesktop = false;

    // Conditional imports
    if (this.isElectron()) {

      this.isElectronDesktop = true;

      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      let databaseFile = AppConfig.knex.filename;

      if (process.env.PORTABLE_EXECUTABLE_DIR)
        databaseFile = slash(process.env.PORTABLE_EXECUTABLE_DIR + '/_internal/db/' + databaseFile);

      let knex = window.require('knex')({
        client: AppConfig.knex.client,
        connection: { filename: databaseFile }
      });

      this.bookshelf = bookshelf(knex);

    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
