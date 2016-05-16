var webpack = require('webpack')

module.exports = {
  entry: [
    './js/sp.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/app',
        loader: "babel"
      },
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + '/js/'
  },
}
