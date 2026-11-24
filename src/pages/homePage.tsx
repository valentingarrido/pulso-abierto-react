import { useState } from "react";
import { ControlPanel } from "../components/controlPanel";
import { CryptoCard } from "../components/cryptoCard";
import { fetchCryptoPrices, type CryptoResponse } from "../services/cryptoService";
import { useFavoritesStore } from "../store/useFavoritesStore";

export function HomePage() {
  const [status, setStatus] = useState<"inicial" | "carga" | "resultado" | "error">("inicial");
  const [cryptoData, setCryptoData] = useState<CryptoResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCrypto, setActiveCrypto] = useState("");

  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  const loadData = async (cryptoToFetch: string) => {
    if (cryptoToFetch === "usdt") {
      setActiveCrypto("usdt");
      setStatus("resultado");
      return;
    }

    setStatus("carga");
    setErrorMessage("");
    try {
      const data = await fetchCryptoPrices();
      setCryptoData(data);
      setActiveCrypto(cryptoToFetch);
      setStatus("resultado");
    } catch (err) {
      console.error("Error al consultar la API:", err);
      setErrorMessage(err instanceof Error ? err.message : "Error al conectar con la API");
      setStatus("error");
    }
  };

  const handleSearch = (cryptoId: string) => {
    loadData(cryptoId);
  };

  const handleRetry = () => {
    if (activeCrypto) {
      loadData(activeCrypto);
    }
  };

  const cryptoMap: Record<string, { name: string; price?: number }> = {
    bitcoin: { name: "Bitcoin", price: cryptoData?.bitcoin?.usd },
    ethereum: { name: "Ethereum", price: cryptoData?.ethereum?.usd },
    solana: { name: "Solana", price: cryptoData?.solana?.usd },
    usdt: { name: "Tether (USDT)", price: undefined },
  };

  const current = activeCrypto ? cryptoMap[activeCrypto] : null;

  return (
    <main className="main-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ textAlign: "right", marginBottom: "1rem", color: "#4b5563", fontSize: "0.95rem" }}>
        Favoritos guardados: <strong>{favoritesCount}</strong>
      </div>

      <ControlPanel onSearch={handleSearch} />

      {status === "inicial" && (
        <p style={{ textAlign: "center", color: "#666", marginTop: "2.5rem" }}>
          Selecciona una criptomoneda y haz clic en "Consultar Precio" para ver la cotización.
        </p>
      )}

      {status === "carga" && (
        <p style={{ textAlign: "center", color: "#2563eb", marginTop: "2.5rem" }}>
          Consultando precio...
        </p>
      )}
      
      {status === "error" && (
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "#dc2626", marginBottom: "1rem" }}>❌ {errorMessage}</p>
          <button
            onClick={handleRetry}
            style={{
              padding: "0.5rem 1.25rem",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Reintentar consulta
          </button>
        </div>
      )}

      {status === "resultado" && current && (
        <section className="crypto-grid" style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
          {current.price === undefined ? (
            <div style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "2.5rem 3rem",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: "360px",
            }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#374151" }}>{current.name}</h3>
              <p style={{ color: "#d97706", fontWeight: "500", margin: 0 }}>
                ⚠️ No se encontraron datos de cotización disponibles para este registro.
              </p>
            </div>
          ) : (
            <CryptoCard
              key={activeCrypto}
              id={activeCrypto}
              name={current.name}
              price={current.price}
            />
          )}
        </section>
      )}
    </main>
  );
}