import "./index.css";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [splashState, setSplashState] = useState("visible");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const clickingRef = useRef(false);
  const rafRef = useRef(null);

  // Cargar datos desde la API
  useEffect(() => {
    Promise.all([
      fetch("/api/categorias").then((r) => r.json()),
      fetch("/api/productos").then((r) => r.json()),
    ]).then(([cats, prods]) => {
      setCategorias(cats);
      setProductos(prods);
      if (cats.length > 0) setActiveCategory(cats[0].id);
    });
  }, []);

  // Splash screen
  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 700));
    const fontsLoaded = document.fonts.ready;
    Promise.all([minDelay, fontsLoaded]).then(() => {
      setSplashState("traveling");
      setTimeout(() => setSplashState("done"), 500);
    });
  }, []);

  // Scroll activo
  useEffect(() => {
    if (categorias.length === 0) return;

    const getActive = () => {
      const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
      const threshold = headerHeight + 1;
      let current = categorias[0].id;
      for (const { id } of categorias) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveCategory(current);
    };

    const handleScroll = () => {
      if (clickingRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(getActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    getActive();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [categorias]);

  const handleCategoryClick = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    clickingRef.current = true;
    setActiveCategory(id);
    const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => { clickingRef.current = false; }, 600);
  };

  const [targetPos, setTargetPos] = useState({ top: 32, left: 25 });

  useEffect(() => {
    if (splashState === "traveling") {
      const headerLogo = document.querySelector(".header .logo");
      if (headerLogo) {
        const rect = headerLogo.getBoundingClientRect();
        setTargetPos({ top: rect.top, left: rect.left });
      }
    }
  }, [splashState]);

  const splashStyle = {
    position: "fixed",
    inset: 0,
    background: "#ffffff",
    zIndex: 999,
    pointerEvents: splashState === "done" ? "none" : "all",
    opacity: splashState === "done" ? 0 : 1,
    transition: splashState === "done" ? "opacity 0s 0.1s" : "none",
  };

  const logoStyle = splashState === "visible" ? {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "220px",
    width: "auto",
    animation: "fadeIn 0.6s ease",
    transition: "none",
  } : {
    position: "fixed",
    top: `${targetPos.top}px`,
    left: `${targetPos.left}px`,
    transform: "translate(0, 0)",
    height: "88px",
    width: "auto",
    transition: "top 0.5s ease, left 0.5s ease, height 0.5s ease, transform 0.5s ease",
  };

  return (
    <>
      {splashState !== "done" && (
        <div style={splashStyle}>
          <img src="/wat-logo.png" alt="WAT Coffee" style={logoStyle} />
        </div>
      )}

      <div style={{
        visibility: splashState === "done" ? "visible" : "hidden",
        opacity: splashState === "done" ? 1 : 0,
        animation: splashState === "done" ? "fadeIn 0.4s ease" : "none",
      }}>
        <div className="wrapper">
          <Header
            categorias={categorias}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            logoVisible={splashState === "done"}
          />
          {categorias.map((cat) => (
            <CategorySection
              key={cat.id}
              categoria={cat.id}
              titulo={cat.label}
              productos={productos.filter((p) => p.categoria_id === cat.id)}
            />
          ))}
          <div className="page-footer" />
        </div>
      </div>
    </>
  );
}

export default App;