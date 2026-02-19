function ProductRow({ producto }) {
  return (
    <div className="product-row">
      <div className="product-image-wrap">
        <img src={producto.imagen} alt={producto.nombre} width="80" height="80" />
      </div>

      <div className="product-info">
        <div className="title-price">
          <h3>{producto.nombre}</h3>
          <span className="price">{producto.precio}</span>
        </div>
        <p>{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default ProductRow;