// 导入
const mysql = require('mysql')

// 创建连接(连接的数据库服务)
const conn = mysql.createConnection({
  host: 'localhost', // 主机名
  port: 3306, // 端口
  user: 'root', // 用户名
  password: 'root', // 密码
  database: 'mydb' // 指定要连接的具体数据库
})

// 连接上数据库
conn.connect()

// 执行SQL conn.query()
// const id = 12 // 可以是用户请求过来的数据
// 只查询id为12的数据
// conn.query('select * from user where id=?', id, (err, results, fields) => {
//   console.log(results)
// })
// 查询数据 名字是'同学们好', id>20
// const n = '同学们好'
// const i = 20
// conn.query(
//   // select * from user where name='同学们好' and id>20
//   'select * from user where name=? and id>?',
//   [n, i],
//   (err, results) => {
//     console.log(results)
//   }
// )

// 删除
// SQL命令: delete from 表名 where 条件
// const name = '王五'
// conn.query('delete from user where name=?', name, (err, results) => {
//   // if(err) return console.log(err)
//   console.log('删除成功')
// })

// 修改,更新
// SQL命令: update 表名 set 键=值 where 条件
// 把表里所有数据的name都改成 隔壁老王
// const name = '隔壁老王'
// conn.query('update user set name=?', name, (err, results) => {
//   console.log('更新成功')
// })
// 把id为12的name,改成 老王12号
// const newName = '老王12号'
// const findID = 12
// conn.query(
//   'update user set name=? where id=?',
//   [newName, findID],
//   (err, results) => {
//     console.log('修改成功')
//   }
// )

// 增加数据
// SQL使用第三种插入数据的命令 : insert into 表名 set 键=值,键=值
//
const obj = {
  name: '张三',
  title: '标题123123213',
  content: '内容asfdasdfdsafsadfsdafadsfadsfdsafdsa'
}
conn.query('insert into user set ?', obj, (err, results) => {
  console.log('增加成功')
})

// 关闭数据库连接
conn.end()
