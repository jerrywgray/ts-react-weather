//@ts-check
/// <reference path="./env.d.ts" />
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const NodemonPlugin = require( 'nodemon-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require('dotenv');

dotenv.config()

var devMode = process.env.NODE_ENV !== "production";

/** @type WebpackConfig[] */
const configs = [
    {
        mode: process.env.NODE_ENV,
        entry: {
            main: './src/browser.tsx',
        },
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
        },
        // Currently we need to add '.ts' to the resolve.extensions array.
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        // Source maps support ('inline-source-map' also works)
        devtool: 'source-map',

        // Add the loader for .ts files.
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/react", "@babel/typescript", ["@babel/env", { "modules": false }]],
                        plugins: ["@babel/plugin-syntax-dynamic-import", "react-hot-loader/babel", "@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties", "@loadable/babel-plugin"],
                    },
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                      'css-loader',
                      //'postcss-loader',
                      'sass-loader',
                    ],
                }
            ],
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        plugins: [
            new LoadablePlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
              })
        ],
    },
    {
        mode: process.env.NODE_ENV,
        entry: {
            server: './src/server.tsx',
        },
        output: {
            path: __dirname + '/dist/server',
            filename: '[name].js',
        },
        // Currently we need to add '.ts' to the resolve.extensions array.
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        // Source maps support ('inline-source-map' also works)
        devtool: 'source-map',

        // Add the loader for .ts files.
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/react", "@babel/typescript", ["@babel/env", { "modules": "auto" }]],
                        plugins: ["@babel/plugin-syntax-dynamic-import", "@loadable/babel-plugin"],
                    },
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                      MiniCssExtractPlugin.loader,
                      'css-loader',
                      //'postcss-loader',
                      'sass-loader',
                    ],
                },
            ],
        },
        target: 'node',
        externals: [nodeExternals()],
        plugins: [
            new NodemonPlugin({
                script: __dirname + "/dist/server/server.js",
                watch:  __dirname + "/dist/server/",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
              })
        ]
    },
];

module.exports = configs;
