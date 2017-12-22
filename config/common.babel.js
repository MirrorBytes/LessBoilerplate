import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import rucksack from 'rucksack-css'
import autoprefixer from 'autoprefixer'

import entrypoints from './entrypoints.babel.js'

export default {
  entry: entrypoints,
  output: {
    path: path.resolve(__dirname, '../public/resources'),
    publicPath: '/resources/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => ([
                  rucksack({
                    fallbacks: true
                  }),
                  autoprefixer()
                ])
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: [
      '.js',
      '.json'
    ]
  },
  devtool: 'eval-source-map'
}
