const jetpack = require('fs-jetpack');

//removes existing database(if any)
jetpack.remove('playground/db/database.empty.backup.sqlite');

//backup database file
jetpack.copy('playground/db/database.sqlite', 'playground/db/database.empty.backup.sqlite');
