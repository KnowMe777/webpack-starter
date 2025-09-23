const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new ESLintPlugin(),
  ],
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['imagemin-mozjpeg', { quality: 75 }],
              ['imagemin-pngquant', { quality: [0.65, 0.8] }],
              ['imagemin-gifsicle', { optimizationLevel: 2 }],
              ['imagemin-svgo'],
            ],
          },
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: { plugins: ['imagemin-webp'] },
          },
          {
            preset: 'avif',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: { plugins: ['imagemin-avif'] },
          },
        ],
      }),
    ],
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
  mode: 'development',
};
