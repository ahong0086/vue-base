module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        ["import",
            {
                "libraryName": "vant",
                "libraryDirectory": "es",
                'style': true
            }, "vant"],
        ["import",
            {
                "libraryName": "element-uielement-ui",
                "libraryDirectory": "packages",
                'style': true
            },
            "element-ui"]
    ]
}
