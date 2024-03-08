const path = require('path');
const CracoLessPlugin = require('craco-less');
const webpack = require('webpack')
const fs = require('fs');

const plainSentences = fs.readFileSync("./sentences", 'utf8')
const sentences = plainSentences.split('\r\n');

module.exports = {
  eslint: {
    configure: {
      globals: {
        SENTENCES: true
      }
    }
  },
  webpack: {
    configure: {
      // cache: false,
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [new webpack.DefinePlugin({
        "SENTENCES": JSON.stringify(sentences)
      })]
    }
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
