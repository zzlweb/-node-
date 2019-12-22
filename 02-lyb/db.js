// 操作数据库
// 1. 安装mysql 第三方模块 npm i mysql
// 2. 导入mysql const mysql = require('mysql')
// 3. 创建连接
// 4. 连接数据库

const mysql = require('mysql')

const config = {
  host: 'localhost', // 连接的主机名
  port: 3306, // 连接的端口
  user: 'root', // 用户名
  password: 'root', // 密码
  database: 'mydb' // 要连接的数据库名
}

module.exports = {
  // 拿到所有的留言数据
  readData(callback) {
    // 创建连接
    const conn = mysql.createConnection(config)

    // 连接数据库
    conn.connect()

    // 执行SQL
    // 拿到所有的留言数据, 按id排序
    conn.query('select * from user order by id desc', (err, results) => {
      // console.log(err)
      // results所有的留言数据
      // console.log(results)
      // 将拿到的数据,告诉调用我的人(通过回调函数,将数据提供给外面的人)
      callback && callback(results)
    })

    // 关闭数据库连接
    conn.end()
  },
  // 根据id删除一条记录
  deleteById(id, callback) {
    // 创建连接
    const conn = mysql.createConnection(config)
    // 连接数据库
    conn.connect()
    // 执行sql: delete from user where id=?
    conn.query('delete from user where id=?', id, (err, results) => {
      // 通知调用我的人, 删除成功
      callback && callback()
    })
    // 关闭数据库连接
    conn.end()
  },
  // 添加(插入)一条留言数据
  addData(newData, callback) {
    // 创建连接
    const conn = mysql.createConnection(config)
    // 连接数据库
    conn.connect()
    // 执行sql: insert into 表名 set ?
    conn.query('insert into user set ?', newData, (err, results) => {
      // 插入成功, 并通知调用我的人
      callback && callback()
    })

    // 关闭数据库连接
    conn.end()
  }
}
