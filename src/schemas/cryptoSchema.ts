import { z } from "zod";

export const cryptoFormSchema = z.object({
  searchQuery: z
    .string()
    .trim()
    .min(2, "El término de búsqueda debe tener al menos 2 caracteres."),
  selectedCrypto: z.enum(["bitcoin", "ethereum", "solana"], {
    errorMap: () => ({ message: "Debes seleccionar una criptomoneda válida." }),
  }),
});

export type CryptoFormData = z.infer<typeof cryptoFormSchema>;
