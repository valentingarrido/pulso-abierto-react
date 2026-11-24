import { useParams, Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface CryptoDetail {
  name: string;
  symbol: string;
  network: string;
  algorithm: string;
  description: string;
}

const CRYPTO_DETAILS: Record<string, CryptoDetail> = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Mainnet",
    algorithm: "Proof of Work (PoW)",
    description: "La primera criptomoneda descentralizada del mundo, creada por Satoshi Nakamoto en 2009. Utiliza tecnología blockchain para permitir transacciones de igual a igual sin intermediarios.",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum Mainnet",
    algorithm: "Proof of Stake (PoS)",
    description: "Plataforma global descentralizada basada en contratos inteligentes que permite la ejecución de aplicaciones descentralizadas (dApps) y finanzas descentralizadas (DeFi).",
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    network: "Solana Network",
    algorithm: "Proof of History & PoS",
    description: "Blockchain de alto rendimiento diseñada para ofrecer velocidades de transacción ultrarrápidas y tarifas extremadamente bajas, orientada a desarrollos masivos.",
  },
usdt: {
  name: "Tether (USDT)",
  symbol: "USDT",
  network: "Multi-chain (Omni, ERC-20, TRC-20)",
  algorithm: "N/A",
  description: "Criptomoneda estable (stablecoin) cuyo valor está diseñado para mantenerse vinculado 1:1 con el dólar estadounidense, ofreciendo liquidez y refugio frente a la volatilidad.",
},
};

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (!id || !CRYPTO_DETAILS[id]) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <h2>Criptomoneda no encontrada</h2>
        <p style={{ color: "#6b7280" }}>El recurso solicitado no existe o no está registrado.</p>
        <Link to="/" style={{ color: "#2563eb" }}>← Volver al inicio</Link>
      </div>
    );
  }

  const crypto = CRYPTO_DETAILS[id];
  const isFav = favorites.includes(id);

  return (
    <main style={{ maxWidth: "650px", margin: "2.5rem auto", padding: "0 1rem" }}>
      <div style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "2.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        position: "relative"
      }}>
        {/* Botón de favorito flotante en la esquina superior derecha sin rectángulo */}
        <button
          onClick={() => toggleFavorite(id)}
          aria-label={isFav ? `Quitar ${crypto.name} de favoritos` : `Agregar ${crypto.name} a favoritos`}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "transparent",
            border: "none",
            fontSize: "1.75rem",
            cursor: "pointer",
            padding: 0
          }}
        >
          {isFav ? "⭐" : "☆"}
        </button>

        <h2 style={{ margin: "0 0 0.5rem 0", color: "#1f2937", fontSize: "1.75rem" }}>
          {crypto.name} <span style={{ fontSize: "1.1rem", color: "#6b7280", fontWeight: "normal" }}>({crypto.symbol})</span>
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "1.5rem" }}>
          Identificador técnico: <code>{id}</code>
        </p>

        <hr style={{ border: "0", borderTop: "1px solid #f3f4f6", margin: "1.5rem 0" }} />

        <div style={{ textAlign: "left", display: "grid", gap: "1rem", color: "#4b5563" }}>
          <div>
            <strong style={{ color: "#111827" }}>Red / Ecosistema:</strong> {crypto.network}
          </div>
          <div>
            <strong style={{ color: "#111827" }}>Mecanismo de Consenso:</strong> {crypto.algorithm}
          </div>
          <div>
            <strong style={{ color: "#111827" }}>Descripción General:</strong>
            <p style={{ margin: "0.5rem 0 0 0", lineHeight: "1.6", color: "#6b7280" }}>
              {crypto.description}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link 
            to="/" 
            style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}
          >
            ← Volver a la consulta
          </Link>
        </div>
      </div>
    </main>
  );
}