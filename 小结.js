// SQL 增删改查:

// 增加(插入数据)
// 1. insert into 表名 (字段1,字段2,字段3...) values (值1,值2,值3...);
// 2. insert into 表名 values (值1,值2...); (null)
// 3. insert into 表名 set 字段1=值1,字段2=值2...; (nodejs中插入数据 直接插入对象)

// 删除
// delete from 表名 where 条件; (id=3, id>14, and, or ...)

// 修改(更新)
// update 表名 set 字段1=值1,字段2=值2...; 更新的是整张表的所有数据
// update 表名 set 字段=值 where 条件;

// 查询(选择)
// select * from 表 where 条件;

// nodejs mysql第三方插件.
// 1. 安装: npm i mysql
// 2. 导入: const mysql = require('mysql')
// 3. 创建一个连接: const conn = mysql.createConnection({配置})
// 4. 连接上数据库: conn.connect()
// 5. 执行SQL查询语句: conn.query(SQL语句)
// conn.query('select * from user where id=?', 具体的id, (err, results) => {})

// 6. 关闭数据库: conn.end()
