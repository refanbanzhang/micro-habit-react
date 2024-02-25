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
  // devServer: {
  //   open: {
  //     app: {
  //       name: 'chrome',
  //       arguments: ['--remote-debugging-port=9222']
  //     }
  //   }
  // },
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
