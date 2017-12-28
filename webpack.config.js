var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        filename: "bundle.js"
    },
    resolve : {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            services: path.resolve(__dirname, '/src/vuejs/services'),
            // helpers: path.resolve(__dirname, '../dev/javascript/helpers'),
            // services: path.resolve(__dirname, '../dev/javascript/services'),
            // modules: path.resolve(__dirname, '../dev/javascript/modules'),
            // components: path.resolve(__dirname, '../dev/javascript/components')
        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                options: {
                    minimize: {discardComments: {removeAll: true}}
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: {discardComments: {removeAll: true}}
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    }
}
