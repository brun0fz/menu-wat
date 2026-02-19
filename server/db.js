require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = process.env.MYSQL_URL
  ? mysql.createPool(process.env.MYSQL_URL)
  : mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "wat_menu",
      waitForConnections: true,
      connectionLimit: 10,
    });

module.exports = pool;