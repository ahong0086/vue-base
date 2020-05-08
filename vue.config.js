module.exports = {
    devServer: {
        open: true,
        // proxy: 'https://www.baidu.net/',
        openPage: 'mobile.html',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    pages: {
        pc: {
            entry: 'src/main.js',
            template: 'public/pc.html'
        },
        // mobile: {
        //     entry: 'src/mobile.js',
        //     template: 'public/mobile.html'
        // },
        login: {
            entry: 'src/login.js',
            template: 'public/login.html'
        }
    },
    productionSourceMap: false
}
