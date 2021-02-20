const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['babel-polyfill', './src/app/index.jsx'],
    output: {
        path: path.join(__dirname, '/src/public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      autoprefixer: {
                        browser: ["last 2 versions"]
                      },
                      plugins: () => [
                        autoprefixer
                      ]
                    }
                  }
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'img/',
                      useRelativePath: true
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-style.css",
            chunkFilename: "[id].css"
        })
    ]
}