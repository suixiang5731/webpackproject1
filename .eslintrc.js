module.exports = {
    env: {
        browser: true,
        es2021: true
    },

    // 可以继承一些别人已经写好的规范
    // 一些已经配置好的规范 eslint-config-standard   eslint-config-airbnb
    extends: [
        "standard",
        "plugin:vue/strongly-recommended" // 再使用
    ],

    // 使用插件提供对特殊语法的支持， 例如 .vue 文件
    // 提供额外的rules+提供一套现成的规范
    plugins: [
        "vue" // 先注册再使用，如上面extends中所示
    ],

    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"/*,
        ecmaFeatures: { // 一些额外的检查项
            jsx: true // 例如，此配置项为 是否对jsx文件进行检查
        }*/
    },

    // 具体编写规则的地方
    // 如果对继承的规范不满意，可以自己在rules内写好，用于覆盖掉继承的规则
    // 自己写的规则优先级最高
    rules: {
        // "no-console": 0 // 0-off 1-warn 2-error
    }
}