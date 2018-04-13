var config = require("./webpack.config")
var webpack = require("webpack")

config.module.rules.push({
    test: /\.js$/,
    loader: "babel-loader?cacheDirectory=true&presets[]=env"
})
config.devtool= "hidden-source-map"



module.exports = config