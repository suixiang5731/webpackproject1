import a from './a'
import '@css/test'
import '@css/lesstest.less'
import img1 from "./img/top1.png"
// import ts1 from './ts1.ts'
import c from './obj'
import axios from "axios";
import _ from "lodash"

console.log(c)

new Image().src = img1
const sum = a(1,3)
/*setTimeout(() => {
    // 此处的 '/!*webpackChunkName:"a"*!/' 为魔法注释,可以指定异步引入的文件名字
    import(/!*webpackChunkName:"a"*!/'./a.js').then(res => {
        console.log(res)
        console.log(res.default(1,2))
    })
}, 3000)*/

// 第一个参数指定遍历的文件夹;
// 第二个参数确定是否遍历子文件夹, false为不遍历;
// 第三个参数设置一个规则, 选择遍历哪种类型的文件
const r = require.context("./mode", false,/.js/)
let _all = 0
r.keys().forEach(item => {
    console.log(r(item))
    _all+=r(item).default
})
let _all2 = r.keys().reduce((sum, item) => {
    sum+=r(item).default
    return sum
}, 0)

console.log('_all: ', _all, '_all2: ', _all2) // 6 6

/*(() => {
    let test1 = 1
    console.log('func')
    console.log('test1', test1)
    console.log('app.js', sum)
})()*/
