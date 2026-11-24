import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface CryptoCardProps {
  id: string;
  name: string;
  price: number;
}

export function CryptoCard({ id, name, price }: CryptoCardProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFav = favorites.includes(id);

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "2.5rem 3rem",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      width: "100%",
      maxWidth: "360px",
      margin: "0 auto",
      position: "relative"
    }}>
      <button
        onClick={() => toggleFavorite(id)}
        aria-label={isFav ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "transparent",
          border: "none",
          fontSize: "1.6rem",
          cursor: "pointer",
          padding: 0,
          color: isFav ? "#f59e0b" : "#9ca3af",
          lineHeight: 1
        }}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.35rem", color: "#374151" }}>{name}</h3>
      <p style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#111827", margin: "0 0 1.5rem 0" }}>
        $ {price.toLocaleString()} USD
      </p>
      <Link 
        to={`/criptomonedas/${id}`} 
        style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}
      >
        Ver Detalle
      </Link>
    </div>
  );
}