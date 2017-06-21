var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        'googlemaps-intro': './src/googlemaps-intro.js',
        'flickr-intro': './src/flickr-intro.js',
        'change-intro': './src/change-intro.js'
    },
    devtool: 'cheap-module-source-map',
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        pathinfo: true
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: process.cwd(),
            verbose: true
        }),
    ],
    module: {
        rules: [{
            test: /\.scss$|\.sass$/,
            use: [
                {
                    loader: "style-loader" // creates style nodes from JS strings
                },
                {
                    loader: "css-loader", // translates CSS into CommonJS
                    // options: {
                    //     modules: true,
                    //     localIdentName: '[name]__[local]___[hash:base64:5]'
                    // }
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }
            ]
        },
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader" // creates style nodes from JS strings
                },
                {
                    loader: "css-loader", // translates CSS into CommonJS
                    // options: {
                    //     modules: true,
                    //     localIdentName: '[name]__[local]___[hash:base64:5]'
                    // }
                }
            ]
        },
        {
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif|eot)(\?.*)?$/,
            loader: 'file-loader',
            options: {
            name: '[name].[ext]?[hash]'
            }
        }]
    }
};
