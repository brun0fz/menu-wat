if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mysql = require("mysql2/promise");

const pool = process.env.DATABASE_URL
  ? mysql.createPool(process.env.DATABASE_URL) // Production: Railway URL
  : mysql.createPool({                        // Local: variables separadas
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "wat_menu",
      waitForConnections: true,
      connectionLimit: 10,
    });

module.exports = pool;