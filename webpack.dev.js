const path = require('path')
const webpack = require("webpack");
const {GitRevisionPlugin} = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
    mode: 'development',
    entry: {
        MPlayer: './src/js/core.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mplayer.bundle.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '__test'),
        },
        compress: true,
        port: 1111,
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
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[require("autoprefixer")({broswers:['last 5 versions']})]
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
                    limit: 40000,
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
    ]
};