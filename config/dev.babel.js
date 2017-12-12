import path from 'path'
import {
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} from 'webpack'

import common from './common.babel.js'

export default {
  ...common,
  plugins: [
    ...common.plugins,
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../public')
  }
}
