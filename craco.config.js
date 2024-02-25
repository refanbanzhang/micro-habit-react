const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      // cache: false,
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      },
    },
  ],
};
