var webpack = require('webpack');
var configBase = require('./webpack.config');

// Customizations for release build
configBase.devtool = false;

configBase.mode = 'production';

module.exports = configBase;
