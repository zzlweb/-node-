// 模块化: app.js 只创建服务器, 配置渲染引擎

// 需求:
// 1. 创建Express服务器
// (1) express第三方包,下载安装 (要先npm init -y初始化; npm i express 安装)
// (2) 导入express const express = require('express')
// (3) 创建express服务
// (4) 启动并监听端口

// 2. 渲染静态首页 (localhost:8888/ GET请求)
// 3. 渲染静态发布页
// 4. (css/jpg) 处理静态资源

const path = require('path')
const fs = require('fs')

const express = require('express')
// 导入bodyParser中间件
const bodyParser = require('body-parser')
// 导入express-session
const expressSession = require('express-session')

const app = express()

// 配置express-session中间件
app.use(
  expressSession({
    secret: '20191221', // 加密字符串
    resave: false, // 如果session没有改变,是否重新存储
    saveUninitialized: true, // 是否自动在用户第一次访问时,开启session空间并将sessionid保存到cookie中
    cookie: { secure: false } // 安全协议,是否仅在https下才允许cookie生效
  })
)

// 配置渲染引擎
// res.render(模板文件名, 数据对象)
// 配置文件的后缀 如果是'art', 表示当模板文件名是index.art(后缀是art时), 它使用art-template动态渲染
// template(模板绝对路径, 数据对象) 使用art-template方法
app.engine('html', require('express-art-template'))
// app.engine('html', (path, data, callback) => {
//   // path : 模板绝对路径
//   // data : 数据对象
//   // //
//   const html = template(path, data) // art-template 动态渲染后的内容
//   callback(null, html)
// })

// app.engine('txt', (path, opt, callback) => {
//   // console.log(path) // path.join(__dirname, 'views') + '1.txt'
//   //
//   // callback(null, '啦啦啦啦啦')
//   fs.readFile(path, 'utf-8', (err, data) => {
//     callback(null, data) // 最终express res.send(data)
//   })
// })

// res.render('index.html', { list: result })

// 配置body-parser中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 到app下找一个全局变量(views)作为目录,
// express默认views指向的就是path.join(__dirname, 'views')
// app.set('views', path.join(__dirname, 'views')) // 设置views属性为d://....02-lyb/views
// app.set('views', path.join(__dirname, 'template'))

app.listen(8888, () => {
  console.log('服务器启动成功...')
})

// 导入router容器
const router = require('./router.js')
// 用app.use应用路由容器
app.use(router.router)

// /static/**** 处理静态资源
// app.use('/static', (req, res) => {
//   // 根据req.url拼接出服务器上的一个文件的路径 express处理过, req.url = /css/index.css
//   express.static(目录名) // 从static目录下,根据req.url去找文件
// })
app.use('/static', express.static('static'))
