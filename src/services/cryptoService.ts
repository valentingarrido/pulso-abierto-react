export interface CryptoResponse {
  [key: string]: {
    usd: number;
  };
}

let lastRequestId = 0;

export async function fetchCryptoPrices(ids: string = "bitcoin,ethereum,solana"): Promise<CryptoResponse> {
  const currentRequestId = ++lastRequestId;

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  if (!response.ok) {
    throw new Error(`Error en API: ${response.status} (Falló la solicitud)`);
  }

  const data = await response.json();

  if (currentRequestId !== lastRequestId) {
    throw new Error("Consulta obsoleta descartada");
  }

  return data;
}