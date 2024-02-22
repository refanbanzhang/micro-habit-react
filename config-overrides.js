const path = require('path');
const addLessLoader = require('customize-cra-less-loader');
const { override, addWebpackAlias } = require('customize-cra');

// 为什么不用craco呢？
// 是因为craco在使用tailwindcss时有问题

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
