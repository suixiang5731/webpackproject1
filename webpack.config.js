// commonjs -- 该文件使用的
// esmodule -- import export default -- 开发中使用的，比如a.js,app.js中
const eslintplugin = require("eslint-webpack-plugin") // eslint插件
/**
 * 将CSS 代码从JavaScript 中分离出来，生成单独的CSS 文件。
 * 使用mini-css-extract-plugin 可以避免将CSS 代码打包到JavaScript 文件中，
 * 减少JavaScript 的体积，同时也可以使得CSS 文件可以被浏览器缓存，
 * 提高页面加载速度
 * @type {MiniCssExtractPlugin}
 */
const mincss = require("mini-css-extract-plugin")
const minimizer = require("css-minimizer-webpack-plugin") // css压缩插件
const htmlwebpackplugin = require("html-webpack-plugin") // html打包插件
// 自定义的手写插件
const myplugin = require('./myplugin')
//dist目录再分一层, 对应的文件类型放在对应的文件夹内 css->dist/css img->dist/img
module.exports = {
    mode: "development", // 指定是生产还是开发，取值： development / production / none

    // entry 入口文件配置
    // entry: ["./app.js", "./app2.js"] // 使用数组时是多个文件作为一个入口
    // 使用对象时，用于多个入口，若某个入口有多个文件可以使用上面的数组写法结合 ，例如 app: ["./app.js", "./app1_1.js"]
    entry: { // 字段名为入口名称
        // app: ["./app.js", "./app1_1.js"], // 当前入口有多个文件
        app: "./app.js",
        app2: "./app2.js"
    },

    // 打包完成之后输出配置
    output: {
        // __dirname 是nodejs中的一个变量，表示当前目录绝对路径的全局变量
        path: __dirname + "/dist",
        // [name] 是指入口配置的name，[hash:4] 表示 生成哈希值并取前四位
        // filename: "[name].[hash:4].bundle.js" 如果想更精确的控制哈希, 可以使用 chunkhash
        filename: "[name].[chunkhash:4].bundle.js"

        // 当需要把一些资源文件放到cdn上去的时候, 可以配置这个选项,
        // 他会自动把这里配置的路径加到静态资源前面
        // publicPath: "www.xxx.com"
    },

    // loader，存放在rules数组中，rules中每一个对象就是一个loader配置
    // loader一种对某种类型文件的处理方案
    module: {
        rules: [
            // 解析打包ts
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            },

            // 解析打包js
            {
                test: /\.js$/,
                // 使用use 或者 loader: "babel-loader"，use用法见下
                // use 后使用数组依次配置多个loader，从后往前处理依次处理对应类型的文件、
                // 比如下方这种写法 就先用 "xxx-loader" 处理，然后使用"babel-loader" 处理
                // use: ["babel-loader", "xxx-loader"],

                // use后跟对象，对相关loader进行详细配置，所有的loader写法格式都基本一样
                use: {
                    loader: "babel-loader",
                    // options内部配置每个loader不一定一样，是跟loader本身相关的
                    // 此处 @babel/preset-env 用于指定编译的结果的版本设置

                    // 此处 配置可以直接挪到 .babelrc文件中
                    /*options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: [
                                            ">1%",
                                            "last 2 versions",
                                            "not ie<=8"
                                        ]
                                    }
                                }
                            ]
                        ]
                    }*/
                }
            },
            {
                test: /\.css$/,
                use: [mincss.loader, "css-loader"/*, "./mycss-loader"*/]
            },
            {
                test: /\.less$/,
                use: [mincss.loader, "css-loader", "less-loader"]
            },
            /*// 01 webpack5 使用url-loader方式
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                /!*url-loader 包含一些优化功能，比如图片转base64
                添加hash值等，转base64并不一定缩小图片体积，只是不用向后台请求图片而已*!/
                loader: "url-loader",
                options: {
                    // 限制 图片大小小于某个尺寸才转base64，否则不转
                    // 一般推荐小于5kb的转base64，即limit: 5000
                    limit: 5000,
                    name: "[name][hash].[ext]"
                }
            },*/
            // 02 webpack5 不用loader使用自带方式
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                // type取值：1.asset/inline；2.asset/resource；3.asset
                // asset/inline 表示全部转换为base64
                // asset/resource 表示全部作为独立文件，都不转换
                // asset 表示智能选择，根据配置去选择是否转换
                type:"asset",
                parser: {
                    // 最大尺寸配置，小于该尺寸的图片转base64
                    dataUrlCondition: {
                        maxSize: 5000
                    }
                },
                generator: { // 输出设置
                    // [ext]表示后缀，此处 [ext] 为 ‘.png’
                    filename: "./img/[name][hash][ext]"
                }
            },

            // 包括其他文件类型也一样的配置，例如下面的mp3和tff文件
            {
                test: /\.mp3$/,
                loader: "url-loader",
                options: {
                    limit: 5000,
                    name: "[name][hash].[ext]"
                }
            },
            {
                test: /\.tff$/,
                loader: "url-loader",
                options: {
                    limit: 5000,
                    name: "[name][hash].[ext]"
                }
            }
        ]
    },

    // 插件
    plugins: [
        new myplugin(),
        new mincss({
            // 加一个 ./css/ 使得 css放入 dist/css 路径内,
            // 如果其他类型文件也需要分类, 都是一样的写法
            filename: "./css/test.bundle.css"
        }),
        // 用于css压缩
        new minimizer(),
        // 用于识别html，以及相关配置
        // 多入口时需要配置多个 htmlwebpackplugin，并使用chunks指定使用哪个入口文件
        new htmlwebpackplugin({
            title: "hello",
            arr: [
                {title: "div1"},
                {title: "div2"},
                {title: "div3"}
            ],
            // html模板
            template: "./index.html",
            // 打包输出的文件名
            filename: "index.html",
            chunks: ["app"], // 使用的入口js
            // 控制打包之后的html是否压缩
            minify: {
                // 是否移除空格
                collapseWhitespace: false,
                // 是否移除注释
                removeComments: false,
                // 是否移除标签上属性之间的空格
                removeAttributeQuotes: false
            },
            inject: "body" //body(或者是写true),head,false
        }),
        new htmlwebpackplugin({
            title: "hello",
            arr: [
                {title: "div1"},
                {title: "div2"},
                {title: "div3"}
            ],
            // html模板
            template: "./index.html",
            // 打包输出的文件名
            filename: "index2.html",
            chunks: ["app2"]
        })


        // new eslintplugin()
    ],

    // 优化相关
    // 单入口-》runtime+vendor+核心业务+异步模块
    // 多入口-》runtime+vendor+每个入口的核心业务代码+common
    // 通用的配置(无论多入口还是单入口): 第三方库单独打包(打包成一个vendor.js), runtime代码单独打包
    // 无论多入口还是单入口,下面的配置都是通用的
    optimization: {
        // splitChunks 代码分割 相关配置
        /*另注: 如果有多个文件被重复引用,他们会被打包到一个文件里,
        这样会导致一些第三方库也被打包在一起*/
        splitChunks: {
            /*chunks 取值:all, async, initial
            *  all: 全部拆分
            *  async: 只拆分异步
            *  initial: 只拆分通步
            * */
            chunks: "all",
           /* /!*某个模块重复引用的最小次数,
            只要重复引用超过该处配置的次数,则分割*!/
            minChunks: 2,
            /!*大于该配置的值才对文件进行拆分,
            减少小文件的不必要拆分,防止产生过多的http请求*!/
            minSize: 0, // 1000byte
            name: "a", // 自定义拆分之后打包的名字*/

            // 只要有特殊的分割需求,都可以通过在 cacheGroups 中配置来实现
            cacheGroups: {
                // 通过下面的 vendor 和 common 配置, 实现了第三方代码和业务代码的分离
                // 一些额外的配置, 此处用于将 node_modules 中的一些第三方库拆分单独打包
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "vendor.[chunkhash:4].js",
                    chunks: "all",
                    minChunks: 1
                },
                // 此处用于将普通地符合规则的重复使用的js文件拆分打包在一起
                common: {
                    filename: "common.[chunkhash:4].js",
                    chunks: "all",
                    /*某个模块重复引用的最小次数,
                    只要重复引用超过该处配置的次数,则分割*/
                    minChunks: 2,
                    /*大于该配置的值才对文件进行拆分,
                    减少小文件的不必要拆分,防止产生过多的http请求*/
                    minSize: 0 // 1000byte
                    // name: "a", // 自定义拆分之后打包的名字
                }

            }
        },

        // 运行时代码拆分单独打包
        runtimeChunk: {
            name: "runtime.js"
        }
    },

    // 开发模式配置
    devServer: {},

    resolve: {
        // 别名
        alias: {
            "@css": "./css"
        },
        // 定义可省略的扩展名
        extensions: [".css", ".js", ".json"]
    }
}