var webpack = require('webpack');
var configBase = require('./webpack.config');

// Customizations for debug build
configBase.devtool = 'inline-source-map';
configBase.mode = 'development';

module.exports = configBase;
