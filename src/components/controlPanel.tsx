import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface ControlPanelProps {
  onSearch: (cryptoId: string) => void;
}

const ALL_CRYPTOS = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "usdt", name: "Tether (USDT)" }
];

export function ControlPanel({ onSearch }: ControlPanelProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCryptos = ALL_CRYPTOS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (crypto: { id: string; name: string }) => {
    setQuery(crypto.name);
    setSelectedId(crypto.id);
    setIsOpen(false);
    setSelectedIndex(0);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedId("");
    setIsOpen(true);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setQuery("");
      setSelectedId("");
      setIsOpen(true);
      setSelectedIndex(0);
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCryptos.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCryptos.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCryptos[selectedIndex]) {
        handleSelect(filteredCryptos[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let targetId = selectedId;

    if (!targetId) {
      const found = ALL_CRYPTOS.find((c) => c.name.toLowerCase() === query.toLowerCase());
      if (found) {
        targetId = found.id;
      } else if (filteredCryptos.length === 1) {
        targetId = filteredCryptos[0].id;
      }
    }

    if (!targetId) {
      alert("Por favor selecciona una criptomoneda válida de la lista.");
      return;
    }

    onSearch(targetId);
    setIsOpen(false);
  };

  return (
    <section 
      className="control-section" 
      style={{ 
        background: "#fff", 
        padding: "2rem", 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb"
      }}
    >
      <h2 style={{ margin: "0 0 1.25rem 0", color: "#1f2937", fontSize: "1.4rem" }}>Panel de Control</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
        
        <div style={{ position: "relative", flex: "1 1 280px" }} ref={dropdownRef}>
          <label htmlFor="crypto-search" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
            Buscar / Seleccionar criptomoneda:
          </label>
          
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              id="crypto-search"
              type="text"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                setIsOpen(true);
                setSelectedIndex(0);

                const match = ALL_CRYPTOS.find((c) => c.name.toLowerCase() === val.toLowerCase());
                if (match) {
                  setSelectedId(match.id);
                } else {
                  setSelectedId("");
                }
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe o selecciona..."
              style={{ 
                width: "100%", 
                padding: "0.65rem 2.25rem 0.65rem 0.75rem", 
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
                boxSizing: "border-box"
              }}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "#9ca3af",
                  padding: 0,
                }}
                title="Borrar texto"
              >
                ✕
              </button>
            )}
          </div>

          {isOpen && (
            <ul style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              listStyle: "none",
              margin: "0.25rem 0 0 0",
              padding: 0,
              zIndex: 10,
              maxHeight: "160px",
              overflowY: "auto",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              color: "#374151"
            }}>
              {filteredCryptos.length > 0 ? (
                filteredCryptos.map((crypto, index) => (
                  <li
                    key={crypto.id}
                    onClick={() => handleSelect(crypto)}
                    style={{
                      padding: "0.65rem 0.85rem",
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f4f6",
                      backgroundColor: index === selectedIndex ? "#f3f4f6" : "#fff",
                      fontSize: "0.95rem"
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {crypto.name}
                  </li>
                ))
              ) : (
                <li style={{ padding: "0.65rem 0.85rem", color: "#9ca3af", fontSize: "0.95rem" }}>
                  No se encontraron resultados
                </li>
              )}
            </ul>
          )}
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: "0.65rem 1.5rem", 
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            fontSize: "0.95rem",
            cursor: "pointer",
            height: "41px"
          }}
        >
          Consultar Precio
        </button>
      </form>
    </section>
  );
}