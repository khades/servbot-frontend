var config = require("./webpack.config")
var webpack = require("webpack")

config.module.rules.push({
    test: /\.js$/,
    loader: "babel-loader?cacheDirectory=true&presets[]=es2015"
})

config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    })
    // ,
    // new webpack.optimize.AggressiveMergingPlugin()
])

module.exports = config