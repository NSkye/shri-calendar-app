const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'stylus-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@@': path.resolve(__dirname, 'src/components'),
    },
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: 'localhost',
    port: 3000,
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
