import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La dirección a la que intentas acceder no existe.</p>
      <Link to="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
        Ir al inicio
      </Link>
    </div>
  );
}
