import { useEffect } from "react";

function Header({ categorias, activeCategory, onCategoryClick, logoVisible }) {
  useEffect(() => {
    if (!activeCategory) return;
    const btn = document.querySelector(".filters button.active");
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  return (
    <div className="header">
      <div className="header-top">
        <img
          src="/wat-logo.png"
          alt="WAT Coffee"
          className="logo"
          height="88"
          style={{ visibility: logoVisible ? "visible" : "hidden" }}
        />
      </div>

      <div className="divider"></div>

      <div className="filters">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={activeCategory === cat.id ? "active" : ""}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Header;