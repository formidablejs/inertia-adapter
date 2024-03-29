const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('./public')
    .ts('resources/js/app.tsx', './public/js')
    .react()
    .postCss('resources/css/app.css', './public/css', [
        //
    ])
    .webpackConfig(require('./webpack.config'))
    .disableNotifications();

if (mix.inProduction()) {
    mix.version();
}
