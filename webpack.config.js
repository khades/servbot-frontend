var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require("webpack")
module.exports = {
    entry: {
        app: [
            "./js/app.js"
        ]
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: "./dist"
    },
    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".js", ".scss", ".css"]
    },

    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader?cacheDirectory=true&presets[]=es2015"

            // },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&importLoaders=1!postcss-loader?sourceMap!sass-loader?sourceMap')
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader?sourceMap=inline')
            }
        ],

        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
  
    ],
    sassLoader: {
        includePaths: [require("bourbon").includePaths]
    }
};