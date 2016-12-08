var config = require("./webpack.config")
var webpack = require("webpack")

config.module.loaders.push({
    test: /\.js$/,
    loader: "babel-loader?cacheDirectory=true&presets[]=es2015"
})

config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
])

module.exports = config