const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'), //absolute path to RepoDir/src
    dist: path.join(__dirname, 'dist') //absolute path to RepoDir/dist
}

module.exports = {
    entry: {
        index: `${PATHS.src}/index.js`,
        content: `${PATHS.src}/content.js`,
        background: `${PATHS.src}/background.js`,
        service: `${PATHS.src}/service.js`,
        app: [
            "crypto"
        ]
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin(
            {
                patterns: [{
                    "from": `${PATHS.src}/manifest.json`,
                    "to": `${PATHS.dist}/manifest.json`,
                }, {
                    "from": `${PATHS.src}/index.html`,
                    "to": `${PATHS.dist}/index.html`,
                }]
            }
        ),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve('buffer/')
        }
    }
}