const path = require('path');
const addLessLoader = require('customize-cra-less-loader');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addLessLoader({
    cssLoaderOptions: {
      modules: true,
    }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
);
