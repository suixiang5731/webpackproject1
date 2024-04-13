import a from './a'
import './test.css'
import './lesstest.less'
// import img1 from "./img/top1.png"
// import ts1 from './ts1.ts'
import c from './obj'
import axios from "axios";
import _ from "lodash"

console.log(c)

// new Image().src = img1
const sum = a(1,3)
/*setTimeout(() => {
    // 此处的 '/!*webpackChunkName:"a"*!/' 为魔法注释,可以指定异步引入的文件名字
    import(/!*webpackChunkName:"a"*!/'./a.js').then(res => {
        console.log(res)
        console.log(res.default(1,2))
    })
}, 3000)*/

(() => {
    let test1 = 1
    console.log('func')
    console.log('test1', test1)
    console.log('app.js', sum)
})()
