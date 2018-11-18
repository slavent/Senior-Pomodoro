const path = require( "path" )
const webpack = require( "webpack" )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )
const CleanWebpackPlugin = require( "clean-webpack-plugin" )
const HtmlWebpackPlugin = require( "html-webpack-plugin" )

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve( "dist" ),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/preset-env", "@babel/preset-react" ]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: [ "css-loader" ]
                } )
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {}
                    }
                ]
            }
        ]
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new CleanWebpackPlugin( [ "dist" ] ),
        new ExtractTextPlugin( "css/styles.css" ),
        new HtmlWebpackPlugin( {
            template: "./src/index.html"
        } ),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [ ".js", ".jsx" ],
        alias: {
            constants: path.resolve( __dirname, "./src/constants" ),
            containers: path.resolve( __dirname, "./src/containers" ),
            components: path.resolve( __dirname, "./src/components" )
        }
    },
    devServer: {
        contentBase: "./dist",
        port: 8080,
        clientLogLevel: "error",
        watchContentBase: true,
        hot: true,
        // open: "Chrome",
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                secure: false,
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
