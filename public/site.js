// Comportamiento propio del sitio (el resto viene de los scripts del kit en /assets).
// Copiar el email: el botón nace oculto y solo se muestra si el navegador puede copiar.
const canCopy = typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext;

for (const btn of document.querySelectorAll("[data-copy]")) {
  if (!canCopy) continue;
  btn.hidden = false;
  const label = btn.textContent;
  const status = btn.parentElement?.querySelector("[data-copy-status]");
  let timer;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = btn.dataset.copied || "Copiado";
      if (status) status.textContent = btn.dataset.copiedStatus || "Email copiado";
    } catch {
      btn.textContent = btn.dataset.copyFailed || "No se pudo copiar";
    }
    clearTimeout(timer);
    timer = setTimeout(() => { btn.textContent = label; if (status) status.textContent = ""; }, 2000);
  });
}

// Las listas de pantallas de los casos (peek de system.js cambia la captura con el foco, el puntero o un toque): acá se
// dice cuál está elegida, para un lector de pantalla.
for (const list of document.querySelectorAll("[data-peek]")) {
  const names = [...list.querySelectorAll("[data-peek-to] [role='button']")];
  const mark = () => names.forEach((n) => {
    const key = n.closest("[data-peek-to]").dataset.peekTo;
    n.setAttribute("aria-pressed", String([...list.querySelectorAll("[data-peek-for]")].some((p) => p.dataset.peekFor === key && !p.hidden)));
  });
  for (const p of list.querySelectorAll("[data-peek-for]")) new MutationObserver(mark).observe(p, { attributes: true, attributeFilter: ["hidden"] });
  mark();
}

// El tema: el que el visitante eligió (guardado) o el de su sistema, que RootShell ya puso en <html data-theme> antes de
// pintar. El botón de la barra nace oculto (sin script no puede cambiar nada) y dice a qué tema cambia. Mientras el
// visitante no elija, la página sigue al sistema también si este cambia con la página abierta.
const root = document.documentElement;
const systemLight = matchMedia("(prefers-color-scheme: light)");
const stored = () => { try { return localStorage.getItem("theme"); } catch { return null; } };
const toggles = document.querySelectorAll("[data-theme-toggle]");

function applyTheme(theme) {
  root.dataset.theme = theme;
  root.dataset.tone = theme;   // el tono de la página del kit (system.js lo calcula una sola vez, al cargar)
  const bg = getComputedStyle(root).getPropertyValue("--p-bg").trim();
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.content = bg;
  for (const btn of toggles) {
    const toLight = theme === "dark";
    btn.setAttribute("aria-label", toLight ? btn.dataset.toLightLabel : btn.dataset.toDarkLabel);
    const text = btn.querySelector("[data-theme-text]");
    if (text) text.textContent = toLight ? btn.dataset.toLight : btn.dataset.toDark;
  }
}

applyTheme(root.dataset.theme === "light" || root.dataset.theme === "dark" ? root.dataset.theme : systemLight.matches ? "light" : "dark");
for (const btn of toggles) {
  btn.hidden = false;
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", next); } catch { /* sin almacenamiento el tema vale para esta página */ }
    applyTheme(next);
  });
}
systemLight.addEventListener("change", (e) => { const s = stored(); if (s !== "light" && s !== "dark") applyTheme(e.matches ? "light" : "dark"); });
