const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const getHtmlNames = () => fs.readdirSync(path.resolve(__dirname, 'source'))
  .filter(filename => filename.includes('.html'))

const createHtmlWebpackPlugins = (htmlFileNames) => {
  return htmlFileNames.map(name => new HtmlWebpackPlugin(
    {
      filename: `${name}`,
      template: `source/${name}`,
      minify: {
        collapseWhitespace: isProd,
      }
    }
  ))
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'                                                                                               // Настройка, позволяющая не грузить дважды одни и те же библиотеки
    },
    runtimeChunk: 'single'
  }
  if (isProd) {
    config.minimize = true
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', {interlaced: true}],
              ['jpegtran', {progressive: true}],
              ['optipng', {optimizationLevel: 5}],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                {xmlns: 'http://www.w3.org/2000/svg'},
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      })
    ]
  }
  return config
}

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'source/index.js'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].bundle.js',
    clean: true
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    watchFiles: path.join(__dirname, 'source'),
    hot: true,
    static: {
      directory: path.join(__dirname, 'docs')
    },
    // open: {
    //   app: {
    //     name: 'chrome',
    //     arguments: ['--incognito', '--new-window']
    //   }
    // },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    // proxy: {
    //   '/**': {
    //     target: 'https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  },
  plugins: [
    ...createHtmlWebpackPlugins(getHtmlNames()),
    new MiniCssExtractPlugin({
        filename: 'css/styles.css',
        linkType: 'text/css',
      }
    ),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'source/images/'),
        to: path.resolve(__dirname, 'docs/images')
      },
        {
          from: path.resolve(__dirname, 'source/fonts/'),
          to: path.resolve(__dirname, 'docs/fonts')
        },
        {
          from: path.resolve(__dirname, 'source/favicon.ico'),
          to: path.resolve(__dirname, 'docs/')
        },
        {
          from: path.resolve(__dirname, 'source/manifest.webmanifest'),
          to: path.resolve(__dirname, 'docs/')
        }
      ]
    }),
    new ESLintPlugin(),
    new ImageminWebpWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env',]
                ]
              }
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env',]
                ]
              }
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ]
  },
  optimization: optimization()
}


