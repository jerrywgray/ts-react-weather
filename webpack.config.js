//@ts-check
/// 
/** 
 * @typedef {import('webpack').Configuration} WebpackConfig 
 * @typedef {import('webpack').Plugin} WebpackPlugin
 **/
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );

require('dotenv').config();

const NODE_ENV = /** @type {"production"|"development"|"none"} */ (process.env.NODE_ENV);

/** @type WebpackConfig[] */
const configs = [{
    mode: NODE_ENV,
    entry: {
      browser: './src/browser.tsx',
    },
    output: {
      path: __dirname + '/dist/client',
      filename: '[name].js',
      publicPath: '/assets/',
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files. CUrrently running
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                ["@babel/env", {
                  "targets": {
                    "browsers": ["last 2 versions"]
                  }
                }],
              ],
              plugins: ["loadable-components/babel", "@babel/proposal-class-properties"]
            }
          }
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  {
    mode: NODE_ENV,
    entry: {
      server: './src/server.tsx',
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
          test: /\.(j|t)sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                '@babel/preset-env'
              ],
              plugins: ["loadable-components/babel", "babel-plugin-dynamic-import-node", "@babel/proposal-class-properties"]
            }
          }
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
      ],
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [ /** @type {any} */(new NodemonPlugin()) ],
  },
];

if (process.env.ANALYZE  === "true") {
  configs[0].plugins.push(new BundleAnalyzerPlugin());
}

if(NODE_ENV === "production") {
  configs[0].plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = configs;