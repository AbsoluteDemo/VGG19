const CopyWebpackPlugin = require("copy-webpack-plugin")

configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
        config.devtool = 'source-map'
        // mutate config for production...
    }
    config.plugins.push(
        new CopyWebpackPlugin([
            {
                from: './static', // 新增可以被index.html访问的静态文件目录,支持多个
                to: 'static',
                ignore: ['.*']
            }
        ])
    )
}
module.exports = {
    //标题title
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = '图像风格迁移'
            return args
        });
    }
}