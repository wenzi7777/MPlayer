const path = require('path')
const webpack = require("webpack")
const {GitRevisionPlugin} = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        MPlayer: './src/js/core.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `mplayer.bundle.min.js`,
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
    },
    // devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("autoprefixer")()]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 39277,
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-loader',
                        options: {
                            esModule: false,
                            variable: 'data'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            MPLAYER_VERSION: `"${require('./package.json').version}"`,
            GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new CompressionPlugin()
    ]
};