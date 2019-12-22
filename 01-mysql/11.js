// 1. 安装mysql (npm i mysql) 要先初始化一下(npm init -y)
// 安装完成之后

// 导入
const mysql = require('mysql')

// 创建连接
const conn = mysql.createConnection({
  host: 'localhost', // 设置主机名
  port: 3306, // 设置端口(默认就是3306)
  user: 'root', // 设置用户名
  password: 'root', // 设置密码
  database: 'mydb' // 指定要连接的数据库名
})

// 连接mysql
conn.connect()

// 执行SQL语句 conn.query()
conn.query('select * from user', (err, result, fields) => {
  // err: 错误信息
  // result: 执行sql语句的结果
  // fields: 所有字段信息
  console.log(result)
})

// 关闭连接
conn.end()

// 1. 安装mysql
// 2. 导入 const mysql = require('mysql')
// 3. 新建连接 const conn = mysql.createConnection({配置的参数})
// 4. 连接上数据库 conn.connect()
// 5. 执行SQL语句 conn.query(SQL语句)
// 6. 关闭连接 conn.end()
