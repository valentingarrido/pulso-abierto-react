# Pulso Abierto

Aplicación web desarrollada con React, TypeScript y Vite para monitorear cotizaciones de criptomonedas en tiempo real, consultar detalles por activo y gestionar favoritos con almacenamiento local.

## Tecnologías principales
- React
- TypeScript
- Vite
- React Router
- Zustand
- Vitest / Testing Library

## Comandos del proyecto
- **Instalar dependencias:** `npm install --legacy-peer-deps`
- **Servidor de desarrollo:** `npm run dev`
- **Ejecutar pruebas:** `npm run test`
- **Generar build de producción:** `npm run build`
- **Previsualizar build local:** `npm run preview`

## Despliegue en Vercel
URL de producción: https://pulso-abierto-react-pink.vercel.app

## Mejora de mantenibilidad (Actividad 4)
- **Problema identificado:** Inconsistencias de tipado estricto durante la compilación de producción (`tsc -b`), incluyendo la propiedad `algorithm` faltante en `usdt` (`src/pages/detailPage.tsx`), la configuración de `z.enum` en `src/schemas/cryptoSchema.ts`, la tipificación de archivos CSS/Vite y la compatibilidad de tipos en `vite.config.ts`.
- **Cambio realizado:** Se agregaron las declaraciones de tipos correspondientes (`src/vite-env.d.ts`), se completó `algorithm` en el detalle de `usdt`, se ajustó `z.enum` y se actualizó `vite.config.ts` para integrar la configuración de pruebas sin conflictos de tipos.
- **Verificación sin regresiones:** Se validaron las pruebas unitarias con `npm run test`, la compilación con `npx tsc -b && npm run build` y el funcionamiento en producción desde Vercel.