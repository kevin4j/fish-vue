const version = new Date().getTime();
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
        host: '10.0.0.57',
        port: '8701',
        // disableHostCheck: true,
        historyApiFallback: true
    },
    configureWebpack: { //打包版本号，防止本地缓存 webpack4用hash，webpack5用fullhash
        output: {
            filename: `[name].[fullhash].${version}.js`,
            chunkFilename: `[name].[fullhash].${version}.js`,
        }
    }
}