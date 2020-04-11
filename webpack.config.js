const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PwaManifestPlugin = require('webpack-pwa-manifest');
const WorboxWebpack = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
                'sass-loader',
                ]
            },
            {
                test: /\.(png|gif|jpg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]',
                        }
                    }
                ]
            },
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './src/assets/static/cerveza_g.png'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
        }),
        new PwaManifestPlugin({
            short_name: "Cervezería Wilmer",
            "gcm_sender_id": "103953800507", 
            name: "Buena elección, Cervezero",
            description: 'Las mejores Cervezas',
            inject: true,
            icons: [
                {
                    src: path.resolve('./public/icon.png'),
                    sizes: [96,128,192,256,1024],
                    destination: path.join('icons', 'ios'),
                    ios: true,
                    type: "image/png"
                },
            ],
            start_url: "/",
            prefer_related_applications: false,
            scope: "/",
            display: "standalone",
            related_applications: [],
            theme_color: "#f3c614",
            background_color: "#f3c614",
            ios: {
                "apple-mobile-web-app-title":'Cervezería Wilmer',
                "apple-mobile-web-app-status-bar-style": 'black-translucent',
                "apple-mobile-web-app-capable": 'yes',
            }
        }),
        new WorboxWebpack.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',
        })
    ] 
}