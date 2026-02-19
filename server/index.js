if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test de conexión a MySQL al iniciar
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión a MySQL OK:", rows);
  } catch (err) {
    console.error("❌ Error de conexión a MySQL:", err);
    process.exit(1);
  }
})();

// GET todas las categorías
app.get("/api/categorias", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categorias ORDER BY orden");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET todos los productos
app.get("/api/productos", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE activo = 1 ORDER BY categoria_id, subcategoria, orden, nombre"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET productos por categoría
app.get("/api/productos/:categoria", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE categoria_id = ? AND activo = 1 ORDER BY subcategoria, orden, nombre",
      [req.params.categoria]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  const host = process.env.RAILWAY_STATIC_URL || `http://localhost:${PORT}`;
  console.log(`Servidor corriendo en ${host}`);
}).on('error', (err) => {
  console.error('Error arrancando servidor:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  process.exit(1);
});