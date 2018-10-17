const jetpack = require('fs-jetpack');
const zipFolder = require('folder-zip-sync');

const appName = require('../../electron-builder.json').productName;

//removes existing database(if any)
jetpack.remove('playground/package-zip/_internal/db/database.sqlite');
//copy empty backup database file
jetpack.copy('playground/db/database.empty.backup.sqlite', 'playground/package-zip/_internal/db/database.sqlite');

//rename top folder to be ${appName} (Game of Sins)
jetpack.remove(`playground/zip/${appName}`);
jetpack.copy('playground/package-zip', `playground/zip/${appName}`);

//zip everything
zipFolder('playground/zip/', `release/${appName}.zip`);
