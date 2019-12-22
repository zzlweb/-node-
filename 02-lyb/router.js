// 路由(app.get/app.post/app.use), 处理业务需求/功能

// 首页动态渲染:
// 1. 配置art-template.
// (1) 安装 npm i art-template express-art-template (一次安装二个包)
// (2) 配置express服务器的渲染引擎
// (3) 使用art-template渲染引擎(得到 template(模板绝对路径,数据对象) 并返回给浏览器)
// res.render()
// 2. 从数据库中获取数据.(mysql数据库中拿数据)

// 删除功能:
// 1. 浏览器向服务器发送删除请求(/del?id=)
// 2. 处理删除请求(GET)
// 3. 告诉数据库删除一条对应的记录
// 4. 删除成功后, 重定向回首页

// 发布功能:
// 1. 浏览器向服务器发送发布请求(/fb), 是通过form表单形式发送的POST请求.
// 2. 处理发布请求(POST)
// 3. 要使用req.body拿到参数,要先配置一个body-parser的中间件
// 3.1 安装body-parser(中间件) npm i body-parser
// 3.2 配置body-parser中间件, const bodyParser = require('body-parser')
// 4. 往数据库里添加一条记录(db.js)
// 5. 插入成功,重定向回首页

// 配置路由:
// 1. 创建一个路由容器 express.Router
// 2. 让app.js使用路由容器(用module.exports 导出这个容器 )
const express = require('express')
const path = require('path')

const db = require('./db.js')

const router = express.Router()

// 拦截登录
router.use('/', (req, res, next) => {
  // 判断是不是登录
  // console.log(req.session)
  if (req.session.login || req.url === '/login.html' || req.url === '/login') {
    // 登录成功;显示登录页;处理登录请求; 都是让下一个中间件去处理
    next()
  } else {
    // 登录失败,重定向到login.html
    res.redirect('/login.html')
  }
})

router.get('/', (req, res) => {
  // // 渲染静态首页其实就是把 views/index.html的内容返回给浏览器
  // // 要先获得绝对路径
  // const filePath = path.join(__dirname, 'views', 'index.html')
  // // res.sendFile() 直接将文件内容读取出来并返回给浏览器
  // res.sendFile(filePath)

  // 从数据库中拿到所有的留言
  db.readData(result => {
    // console.log(result)
    // 在拿到数据时,才会执行
    res.render('index.html', { list: result })
  })
})

// 渲染静态的发布页 (/add)
router.get('/add', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'add.html')
  res.sendFile(filePath)
})

// 处理删除请求(GET)
router.get('/del', (req, res) => {
  // 拿到要删除的id
  // req.query 用户传过来的查询字符串转换成的对象
  const id = req.query.id
  // 告诉数据库删除一条对应的记录
  db.deleteById(id, () => {
    // 删除成功,重定向回首页
    res.redirect('/')
  })
})

// 处理发布请求(POST)
router.post('/fb', (req, res) => {
  // 拿到所有发送过来的内容(name, title, content)
  // 默认undefined, 配置完body-parser之后
  // req.body 发送过来的内容
  const newData = {
    ...req.body,
    time: new Date()
  }
  db.addData(newData, () => {
    // 表示插入成功,重定向回首页
    res.redirect('/')
  })
})

router.get('/test', (req, res) => {
  res.render('2.txt', {})
})

// 渲染静态登录页面(/login.html)
router.get('/login.html', (req, res) => {
  // 拼接views/login.html绝对路径
  const filePath = path.join(__dirname, 'views', 'login.html')
  // res.sendFile
  res.sendFile(filePath)
})

// 处理/login的POST请求
// 要使用express-session实现状态保持
// 1. 安装express-session
// 2. 导入并配置express-session中间件(app.js)
// 3. 配置成功后,就能拿到req.session
router.post('/login', (req, res) => {
  // console.log(req.session)
  // 拿到用户名,密码
  if (req.body.username === 'root' && req.body.password === 'root') {
    req.session.login = true // 登录成功
    // console.log(req.session)
    // 重定向回首页
    res.redirect('/')
  } else {
    // 登录失败, 重定向login.html页
    res.redirect('/login.html')
  }
  // res.send(req.body)
})

// 退出登录
router.get('/logout', (req, res) => {
  // 将login设置为false,表示未登录
  req.session.login = false
  res.redirect('/login.html')
})

//
module.exports = {
  router
}
