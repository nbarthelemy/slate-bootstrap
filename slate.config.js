/* eslint-disable */
//
// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const PostcssCssnano = require("cssnano")()
const PostcssAutoprefixer = require("autoprefixer")({ browsers: 'last 2 versions' })
const PostcssPurgeCss = require('@fullhuman/postcss-purgecss')

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
  },
  
  // https://github.com/Shopify/slate/issues/1034
  'webpack.postcss.plugins': (config) => {
    const plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        PostcssPurgeCss({
            content: ['./src/**/*.liquid'],
            whitelistPatterns: [/^(is-|has-|will-|js-)/],
            keyframes: true,
            fontFace: true
        }),
        PostcssAutoprefixer,
        PostcssCssnano
      )
    }
    return plugins;
  }  
};
