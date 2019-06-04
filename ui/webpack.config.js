const path = require( "path" )
const webpack = require( "webpack" )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )
const CleanWebpackPlugin = require( "clean-webpack-plugin" )
const HtmlWebpackPlugin = require( "html-webpack-plugin" )
const { InjectManifest } = require( "workbox-webpack-plugin" )

module.exports = {
    entry: "./app.js",
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
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: ["css-loader"]
                } )
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[path][name].[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new CleanWebpackPlugin( ["dist"] ),
        new ExtractTextPlugin( "css/styles.css" ),
        new HtmlWebpackPlugin( {
            template: "./index.html"
        } ),
        new webpack.HotModuleReplacementPlugin(),
        new InjectManifest( {
            swSrc: "./workers/sw.js",
            swDest: "sw.js"
        } )
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            constants: path.resolve( __dirname, "./constants" ),
            containers: path.resolve( __dirname, "./containers" ),
            components: path.resolve( __dirname, "./components" ),
            reducers: path.resolve( __dirname, "./reducers" ),
            actions: path.resolve( __dirname, "./actions" ),
            middlewares: path.resolve( __dirname, "./middlewares" )
        }
    },
    devServer: {
        contentBase: "./dist",
        port: 8080,
        clientLogLevel: "error",
        watchContentBase: true,
        hot: true,
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:3001",
                secure: false,
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
