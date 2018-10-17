const jetpack = require('fs-jetpack');

//removes existing database(if any)
jetpack.remove('playground/db/database.sqlite');

//creates empty database
jetpack.file('playground/db/database.sqlite');
