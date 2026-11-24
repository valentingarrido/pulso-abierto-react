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

## Verificación final
- **Pruebas ejecutadas:** Pruebas unitarias ejecutadas con `npm run test` y aprobadas sin errores.
- **Build generado correctamente:** Compilación verificada con `npx tsc -b` y `npm run build` sin errores de tipos ni empaquetado.
- **Preview comprobado:** Vista previa local revisada con `npm run preview`, verificando carga de la interfaz, rutas, detalles y favoritos.
- **Despliegue realizado:** Aplicación desplegada y operativa en Vercel en `https://pulso-abierto-react-pink.vercel.app/` desde el repositorio `https://github.com/valentingarrido/pulso-abierto-react`.
- **Fecha de verificación:** 24 de noviembre de 2026.

## Mejora de mantenibilidad (Actividad 4)
- **Problema identificado:** Inconsistencias de tipado estricto durante la compilación de producción (`tsc -b`), incluyendo la propiedad `algorithm` faltante en `usdt` (`src/pages/detailPage.tsx`), la configuración de `z.enum` en `src/schemas/cryptoSchema.ts`, la tipificación de archivos CSS/Vite y la compatibilidad de tipos en `vite.config.ts`.
- **Cambio realizado:** Se agregaron las declaraciones de tipos correspondientes (`src/vite-env.d.ts`), se completó `algorithm` en el detalle de `usdt`, se ajustó `z.enum` y se actualizó `vite.config.ts` para integrar la configuración de pruebas sin conflictos de tipos.
- **Verificación sin regresiones:** Se validaron las pruebas unitarias con `npm run test`, la compilación con `npx tsc -b && npm run build` y el funcionamiento en producción desde Vercel.