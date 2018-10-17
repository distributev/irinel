const jetpack = require('fs-jetpack');

//generate template-folder-structure
jetpack.remove('playground/package-zip');
jetpack.copy('src-packaging/template-folder-structure', 'playground/package-zip');

//copy exe file
const appName = require('../../electron-builder.json').productName;
const version = require('../../package.json').version;

jetpack.copy(`release/${appName} ${version}.exe`, `playground/package-zip/${appName}.exe`);

//copy database file
jetpack.copy('playground/db/database.sqlite', 'playground/package-zip/_internal/db/database.sqlite');
