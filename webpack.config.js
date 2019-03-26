const path = require( "path" )
const webpack = require( "webpack" )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )
const CleanWebpackPlugin = require( "clean-webpack-plugin" )
const HtmlWebpackPlugin = require( "html-webpack-plugin" )
const CopyPlugin = require( "copy-webpack-plugin" )

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
            template: "./src/index.html"
        } ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin( [
            { from: "src/workers/sw.js", to: "" }
        ] )
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            constants: path.resolve( __dirname, "./src/constants" ),
            containers: path.resolve( __dirname, "./src/containers" ),
            components: path.resolve( __dirname, "./src/components" ),
            reducers: path.resolve( __dirname, "./src/reducers" ),
            actions: path.resolve( __dirname, "./src/actions" ),
            middlewares: path.resolve( __dirname, "./src/middlewares" )
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
                target: "http://localhost:3000",
                secure: false,
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
