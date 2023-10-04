const mysql = require("mysql2");
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "brian_hub_v2",
  password: "cwjdek30",
  connectionLimit: 5,
});

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("failed");
    return;
  }
  // 尝试连接
  connection.connect((err) => {
    if (err) {
      console.log("二次验证失败");
    } else {
      console.log("数据库连接成功");
    }
  });
});

const connect = connectionPool.promise();

module.exports = connect;
