# svg-font-generator
Generate web font from svgs.

This is based on [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont), templates file are comes from (with minor modifications): https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.css and https://github.com/backflip/gulp-iconfont-css/tree/master/templates, svg icons are from: https://github.com/encharm/Font-Awesome-SVG-PNG

## Usage
Put svg icons in `svg` folder, then call `gulp build` to build fonts. Fonts will be available at `/build/` folder, as well as a `demo.html` file.
