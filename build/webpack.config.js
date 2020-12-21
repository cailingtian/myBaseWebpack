const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不支持拆分多个css文件
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 支持拆分多个css文件

module.exports = {
  mode: 'development', // 开发模式
  entry: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')], // 打包入口文件
  output: {
    filename: 'js/[name].[hash:8].js', // 打包输出的js文件
    path: path.resolve(__dirname, '../dist') // 打包输出的目录
  },
  plugins: [
    // 单入口文件配置
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, '../src/index.html') // 引用html基础模板
    }),
    //  多入口文件配置
    // new HtmlWebpackPlugin({
    //   template:  path.resolve(__dirname, '../public/index.html'),
    //   filename: 'indexA.html',
    //   chunks: ['moduleA'] // 与入口文件对应的模块名
    // }),
    // new HtmlWebpackPlugin({
    //   template:  path.resolve(__dirname, '../public/index.html'),
    //   filename: 'indexB.html',
    //   chunks: ['moduleB'] // 与入口文件对应的模块名
    // })
    // 拆分单个css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),  // 清除webpack上一次打包的文件
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // 从右往左依次解析
      },
      {
        test: /\.less$/i,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],// 从右往左依次解析
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, // 图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                  publicPath: '/assets/'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(map4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/, // 媒体文件
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              publicPath: '/assets/'
            }
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体文件
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: "fonts/[name].[hash:8].[ext]",
              publicPath: '/assets/'
            }
          }
        }
      },
      {
        test: /\.js$/,  // 对ES6/ES7/ES8语法编译成ES5
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/ // 不包含对依赖目录的编译
      }
    ]
  }
}
