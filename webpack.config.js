var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require("webpack")
module.exports = {
    entry: {
        app: [
            "./js/app.ts"
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
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", ".css"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&importLoaders=1!postcss-loader?sourceMap!sass-loader?sourceMap')
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader?sourceMap=inline')
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
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