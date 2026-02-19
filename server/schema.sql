CREATE DATABASE IF NOT EXISTS wat_menu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wat_menu;

CREATE TABLE IF NOT EXISTS categorias (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  orden INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  precio VARCHAR(20) NOT NULL,
  categoria_id VARCHAR(50) NOT NULL,
  subcategoria VARCHAR(100),
  imagen VARCHAR(500),
  activo TINYINT(1) DEFAULT 1,
  orden INT DEFAULT 0,
  precio_numero DECIMAL(10,2),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO categorias (id, label, orden) VALUES
  ('hot-season', 'HOT SEASON', 1),
  ('bebidas', 'Bebidas', 2),
  ('para-comer', 'Para comer', 3);

INSERT INTO productos (nombre, descripcion, precio, categoria_id, subcategoria, imagen) VALUES
  ('Iced Carrot Latte', 'Reducción de zanahoria, especias, espresso y cold foam', '6.500', 'hot-season', NULL, 'madmcha.jpg'),
  ('Iced strawberry Matcha', 'Shot de matcha, pulpa de frutillas, leche y cold foam', '7.500', 'hot-season', NULL, 'strawmatcha.jpg'),
  ('Berry cold brew', 'Cold brew 18 horas, reducción de mango y cítricos', '7.000', 'hot-season', NULL, 'chaiiced.jpg'),
  ('Espresso', 'Microlote brasileño, tostado medio, notas de chocolate oscuro', '2.000', 'bebidas', 'Hot', 'espresso.jpg'),
  ('Latte', 'Espresso + leche vaporizada artesanal', '2.500', 'bebidas', 'Hot', 'latte.jpg'),
  ('Iced Latte', 'Espresso + leche fría sobre hielo', '2.700', 'bebidas', 'Cold', 'iced-latte.jpg'),
  ('Cold Brew', 'Extracción en frío durante 18 horas', '3.200', 'bebidas', 'Cold', 'cold-brew.jpg'),
  ('CROISSANT JAMÓN Y QUESO', 'Masa laminada, jamón artesanal y queso gruyère', '4.800', 'para-comer', 'Salado', 'croissant.jpg'),
  ('PAIN AU CHOCOLAT', 'Masa laminada con chocolate 70% cacao', '4.200', 'para-comer', 'Pastry', 'croissant.jpg'),
  ('BANANA BREAD', 'Sin aditivos, endulzado con azúcar morena y vainilla', '3.800', 'para-comer', 'Pastry', 'banana-bread.jpg');