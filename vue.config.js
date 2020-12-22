const version = new Date().getTime();
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
        host: '10.0.0.57',
        port: '8701',
        disableHostCheck: true
    },
    configureWebpack: { //打包版本号，防止本地缓存
        output: {
            filename: `[name].[hash].${version}.js`,
            chunkFilename: `[name].[hash].${version}.js`,
        }
    }
}