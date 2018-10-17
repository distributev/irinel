const jetpack = require('fs-jetpack');

//remove existing icons
jetpack.remove('src/favicon.png');
jetpack.remove('src/favicon.256x256.png');
jetpack.remove('src/favicon.512x512.png');

jetpack.remove('src/favicon.icns');

jetpack.remove('src/favicon.ico');

//copy new icons
jetpack.copy('src/assets/icons/png/256x256.png', 'src/favicon.png');
jetpack.copy('src/assets/icons/png/256x256.png', 'src/favicon.256x256.png');
jetpack.copy('src/assets/icons/png/512x512.png', 'src/favicon.512x512.png');

jetpack.copy('src/assets/icons/mac/icon.icns', 'src/favicon.icns');

jetpack.copy('src/assets/icons/win/icon.ico', 'src/favicon.ico');
