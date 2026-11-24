import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { DetailPage } from "./pages/detailPage";
import { NotFoundPage } from "./pages/notFoundPage";

export function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        
        <header className="site-header" style={{ padding: "1.5rem", background: "#1e293b", color: "#fff", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Pulso Abierto</h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>Monitoreo en tiempo real de criptomonedas (React Router)</p>
        </header>

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/criptomonedas/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <footer className="site-footer" style={{ padding: "1rem", background: "#0f172a", color: "#94a3b8", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>Datos obtenidos desde la API pública de <strong>CoinGecko</strong>.</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}