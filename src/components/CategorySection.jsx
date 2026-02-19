import React, { forwardRef } from "react";
import ProductRow from "./ProductRow";

const CategorySection = forwardRef(({ categoria, titulo, productos, esTemporada }, ref) => {
  const sinSubcategoria = productos.filter((p) => !p.subcategoria);
  const subcategorias = [...new Set(productos.filter((p) => p.subcategoria).map((p) => p.subcategoria))];

  return (
    <div className="category" id={categoria} ref={ref}>
      <div className="category-rule"></div>
      <h2 className="category-main-title">{titulo}</h2>

      {sinSubcategoria.map((producto) => (
        <ProductRow key={producto.id} producto={producto} />
      ))}

      {subcategorias.map((sub) => (
        <div key={sub}>
          <h3 className="subcategory-title">{sub}</h3>
          {productos
            .filter((p) => p.subcategoria === sub)
            .map((producto) => (
              <ProductRow key={producto.id} producto={producto} />
            ))}
        </div>
      ))}
    </div>
  );
});

export default CategorySection;