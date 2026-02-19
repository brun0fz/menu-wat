if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "wat_menu",
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

pool.getConnection()
  .then(conn => {
    console.log("MySQL conectado correctamente");
    conn.release();
  })
  .catch(err => {
    console.error("Error conectando a MySQL:", err.message);
  });

module.exports = pool;