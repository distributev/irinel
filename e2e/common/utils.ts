import * as jetpack from "fs-jetpack";

import {
  Application
} from 'spectron';

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

const appName = require('../../electron-builder.json').productName;

const beforeEach = function () {

  _restoreCleanState();

  chai.should();
  chai.use(chaiAsPromised);

  this.timeout(500000);
  this.app = new Application({
    path: `playground/package-zip/${appName}.exe`,
  });

  var ctrl = this;

  return this.app.start().then(function () {
    chaiAsPromised.transferPromiseness = ctrl.app.transferPromiseness
    return ctrl.app;
  });

};

const afterEach = function () {

  this.timeout(500000);

  if (this.app && this.app.isRunning()) {

    return this.app.stop();

  }
  return undefined;

};

const _restoreCleanState = function () {

  //removes existing database(if any)
  jetpack.remove('playground/package-zip/_internal/db/database.sqlite');

  //copy empty backup database file
  jetpack.copy('playground/db/database.empty.backup.sqlite', 'playground/package-zip/_internal/db/database.sqlite');

};

export default {
  beforeEach,
  afterEach,
};
