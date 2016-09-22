var webpack = require('webpack');

module.exports = {
      entry: './src/index.js',
      output: {
          path: __dirname + '/dist/',
          filename: 'index.js'
      },
      devtool: 'source-map',
      plugins: process.env.NODE_ENV === 'prod' ? [
          new webpack.optimize.UglifyJsPlugin(),
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery"
          })
      ] : [
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery"
          })
      ],
      module: {
          loaders: [
              { test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader']},
              { test: /\.css$/,  loader: 'style-loader!css-loader'},
              { test: /\.scss$/, exclude: /node_modules/, loader: 'sass-loader'},
              { test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader'},
              { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
              { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
              { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
              { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
          ]
      }

};
