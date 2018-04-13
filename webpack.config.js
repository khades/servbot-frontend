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
        extensions: [".js", ".scss"]
    },

    module: {
        rules: [{
                test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                   fallback: "style-loader",
                    use: [{
                            loader: 'css-loader?sourceMap&importLoaders=1'
                        },
                        {
                            loader: 'postcss-loader?sourceMap'
                        },
                        {
                            loader: 'sass-loader?sourceMap'
                        }
                    ]
                })
            },

            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            }
            // ,
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader?cacheDirectory=true&presets[]=env"
            // }
        ]



    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()

    ]
};