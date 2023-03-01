const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    //
    mode: 'development',
    entry: './src/index.js',

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        watchFiles: ["src/*.html"],
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
  };