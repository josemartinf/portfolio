# Portafolio — José Martin Flores

Sitio personal de José Martin Flores, Software Engineer. Tiene una portada y tres páginas de caso: Envo, Stockie y Club Zapateo, con su arquitectura y sus decisiones.

Publicado en https://www.joseflores.codes.

## Stack

- Next.js 16 (App Router) con export estático (`out/`), React 19 y TypeScript.
- Estilos: CSS propio. Las hojas del kit de diseño están en `public/assets/` y los ajustes del sitio en `public/site.css`. No usa Tailwind.
- Contenido en `src/data/`; componentes en `src/components/`.
- Pruebas: Vitest (unitarias) y Playwright (e2e).

## Comandos

```bash
npm install
npm run dev          # servidor de desarrollo
npm run build        # genera el sitio estático en out/
npm run lint
npm run check:out    # revisa out/ contra las frases, el origen y los secretos prohibidos
npx vitest run       # pruebas unitarias
npx playwright test  # pruebas e2e
```

## Capturas

`scripts/capture.mjs` genera las capturas de `public/projects/` desde instancias con datos demo. Las credenciales se leen de variables de entorno; sus nombres están en el comentario del principio del script.
