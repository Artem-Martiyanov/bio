const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


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
        generator: [
          {
            preset: 'webp',
            type: 'asset',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp']
            }
          }
        ]
      }),
    ]
  }
  return config
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'source/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    clean: true
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    open: {
      app: {
        name: 'chrome',
        arguments: ['--incognito', '--new-window']
      }
    },
    compress: true,
    port: 3000,
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
        to: path.resolve(__dirname, 'dist/images')
      }]
    }),
    new ESLintPlugin()
  ],
  
  module: {
    rules: [
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
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  optimization: optimization()
}


