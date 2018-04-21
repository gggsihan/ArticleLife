var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context:__dirname+'/src',
    entry:"./js/router.js",
    devtool: debug ? "inline-sourcemap" : null,
    module:{
        rules:[
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs']//添加组件的插件配置
                }
            },
            //下面是添加的css的loader，也即是css模块化的配置方法
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    output:{
        path:__dirname+'/src/',
        filename:'bundle.js',
        publicPath:'/src/'
    }
}