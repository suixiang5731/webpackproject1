module.exports = {
    env: {
        browsers: true,
        es2021: true
    },

    // 可以继承一些别人已经写好的规范
    // eslint-config-standard
    // eslint-config-airbnb
    extends: [

    ],

    plugins: [

    ],

    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: { // 一些额外的检查项
            jsx: true // 例如，此配置项为 是否对jsx文件进行检查
        }
    },

    // 具体编写规则的地方
    rules: {
        "no-console": 2 // 0-off 1-warn 2-error
    }
}