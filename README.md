# Portafolio — José Martin Flores

Sitio personal de José Martin Flores, Software Engineer. Tiene una portada con todos los proyectos en una sola sección (cada uno con su etiqueta: Cliente, Producto propio o Personal) y tres páginas de caso: Envo, Stockie y Club Zapateo, con su arquitectura y sus decisiones. La portada cuenta resultados en lenguaje de negocio; el detalle técnico vive en cada caso, y `HOME_JARGON` (`src/data/copy-guard.ts`) lo vigila en los tests.

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
npm run build        # genera el sitio estático en out/ (y saca de out/assets lo que el kit trae solo para trabajar)
npm run lint
npm run check:out    # revisa out/ contra las frases, las cadenas privadas y los secretos prohibidos
npm run cv           # genera los dos CV en PDF con los datos del sitio
npm run og           # genera las imágenes al compartir, con out/ servido en el puerto 4173
npx vitest run       # pruebas unitarias
npx playwright test  # pruebas e2e
```

En cada PR, GitHub Actions corre lint, las pruebas unitarias, el build y `check:out` (`.github/workflows/ci.yml`).

Las cadenas privadas que no pueden aparecer en el sitio no están en el repo: se leen de `.copy-guard.local.json`, una lista de expresiones regulares que git ignora. Sin ese archivo esa parte de la revisión queda vacía, así que conviene correr `npm test` y `npm run check:out` en una máquina que lo tenga antes de publicar.

## Capturas

`scripts/capture.mjs` genera las capturas de `public/projects/` desde instancias con datos demo. Las credenciales se leen de variables de entorno; sus nombres están en el comentario del principio del script.

## Marca

El monograma JF está en `public/brand/jf-mark.svg` (el mismo que `src/app/icon.svg`, el favicon). Para el pie de un sitio de cliente, **siempre con su permiso**, hay dos sellos: `hecho-por-joseflores-oscuro.svg` para fondos oscuros y `hecho-por-joseflores-claro.svg` para fondos claros.

```html
<a href="https://www.joseflores.codes" target="_blank" rel="noopener">
  <img src="https://www.joseflores.codes/brand/hecho-por-joseflores-oscuro.svg" alt="Hecho por joseflores.codes" width="228" height="32" loading="lazy">
</a>
```
