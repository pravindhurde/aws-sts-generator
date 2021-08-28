import palette from './node_modules/zsui/src/configuration/palette.m.js';
import appConfig from './myAppConfig.m.js';
const {app, ui, inverse} = appConfig.default;
import buildConfig from './node_modules/zsui/src/configuration/configurator.mjs';
buildConfig(ui, palette.default,  './src/config.css', './src/config.less');
buildConfig(inverse, palette.default,  './src/config.inverse.css', './src/config.inverse.less');