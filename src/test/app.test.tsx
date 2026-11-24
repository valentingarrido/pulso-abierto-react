import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchCryptoPrices } from "../services/cryptoService";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { CryptoCard } from "../components/cryptoCard";
import { BrowserRouter } from "react-router-dom";

// Mock de la API fetch global tipada
const globalFetch = vi.fn();
globalThis.fetch = globalFetch;

describe("Pruebas de la aplicación Pulso Abierto", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useFavoritesStore.setState({ favorites: [] });
  });

  it("A. Permite marcar y desmarcar una criptomoneda como favorita", async () => {
    render(
      <BrowserRouter>
        <CryptoCard id="bitcoin" name="Bitcoin" price={95000} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /agregar bitcoin a favoritos/i });
    expect(button.textContent).toBe("☆");

    await userEvent.click(button);
    expect(useFavoritesStore.getState().favorites).toContain("bitcoin");

    const removeButton = screen.getByRole("button", { name: /quitar bitcoin de favoritos/i });
    expect(removeButton.textContent).toBe("⭐");
  });

  it("D. Servicio: procesa correctamente una respuesta HTTP exitosa", async () => {
    const mockData = { bitcoin: { usd: 90000 } };
    globalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchCryptoPrices("bitcoin");
    expect(result).toEqual(mockData);
  });

  it("D. Servicio: lanza un error cuando response.ok es false", async () => {
    globalFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchCryptoPrices("bitcoin")).rejects.toThrow("Error en API: 500");
  });
});