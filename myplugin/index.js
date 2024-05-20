class myplugin {
    constructor(config) {
        this.config = config
    }

    apply(compiler) { // 关键方法
        // webpack插件的工作机制就是 监听webpack的某个生命周期 -- emit：打包完成；make：刚开始打包；done：打包结束
        // 一般 emit 和 done 的时候已经有打包结果，最好监 听者两个生命周期

        compiler.hooks.emit.tap("myplugin", compilation => {
            // console.log('assets>>',compilation.assets)
            console.log('js内容>>',compilation.assets['app.f2c2.bundle.js'].source())
        })
        // done周期的时候已经输出到 dist文件夹内了，可以直接读取操作文件
        // 那么该周期可以做一些例如自动上传到服务器的工作
        compiler.hooks.done.tap("myplugin", compilation => {
            // dist-压缩 -> 上传到服务器 -> 服务器解压
        })
    }
}
module.exports = myplugin
/**
 * 关于插件的编写
 * 可以思考一下 打包之后有什么事情是需要人工去的 -> 就可以开发插件帮我们自动去做
 * 插件就是越来越多的自动化事件，
 */