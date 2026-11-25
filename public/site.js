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
  // en un teléfono la lista es una fila que se desliza: la pantalla elegida queda a la vista. Mientras la fila se corre,
  // el botón vecino pasa bajo el puntero y el kit (pointerenter) lo elegía: ahí solo eligen el toque y el foco
  const slides = (row) => row.scrollWidth > row.clientWidth + 1 && getComputedStyle(row).overflowX === "auto";
  list.querySelector(".rows")?.addEventListener("pointerenter", (e) => { if (slides(e.currentTarget)) e.stopPropagation(); }, true);
  names.forEach((n) => n.addEventListener("click", () => {
    const row = n.closest(".rows");
    if (!slides(row)) return;
    const li = n.closest("li").getBoundingClientRect(), box = row.getBoundingClientRect();
    row.scrollBy({ left: li.left - box.left - (box.width - li.width) / 2, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
  for (const p of list.querySelectorAll("[data-peek-for]")) new MutationObserver(mark).observe(p, { attributes: true, attributeFilter: ["hidden"] });
  mark();
}

// Un teléfono muestra un encuadre de cada captura de un caso (src/data/phone-focus.ts); un toque la abre entera, a un
// tamaño que se lee y se recorre con el dedo. El botón cubre la captura y solo se ve bajo 640 px (site.css). Un <dialog>
// modal: Escape, el gesto de volver y el botón lo cierran, y el foco vuelve a la captura.
const zoomable = document.querySelector("main[data-zoom]");
if (zoomable && typeof HTMLDialogElement === "function") {
  const dialog = document.createElement("dialog");
  dialog.className = "zoom";
  dialog.innerHTML = '<div class="zoom__bar"><p class="zoom__title"></p><button type="button" class="zoom__close"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button></div><div class="zoom__view" tabindex="0" autofocus></div>';
  const title = dialog.querySelector(".zoom__title"), view = dialog.querySelector(".zoom__view"), close = dialog.querySelector(".zoom__close");
  close.setAttribute("aria-label", zoomable.dataset.zoomClose);
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { view.replaceChildren(); document.documentElement.classList.remove("zoom-open"); });
  document.body.append(dialog);

  for (const frame of zoomable.querySelectorAll(".bframe:not(.ly-piece)")) {
    const img = frame.querySelector("img"), name = frame.querySelector(".bframe__label").dataset.label;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shot-zoom";
    btn.setAttribute("aria-label", `${zoomable.dataset.zoom}: ${name}`);
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 3h4v4M7 15H3v-4M15 3l-5 5M3 15l5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.addEventListener("click", () => {
      const full = new Image(1600, img.height);
      full.alt = img.alt;
      full.src = img.getAttribute("src");
      title.textContent = name;
      dialog.setAttribute("aria-label", name);
      view.replaceChildren(full);
      document.documentElement.classList.add("zoom-open");
      dialog.showModal();
      // abre donde estaba el encuadre, no en la barra lateral
      view.scrollTo({ left: Number(frame.style.getPropertyValue("--m-x") || 0) * full.getBoundingClientRect().width });
    });
    frame.querySelector(".bframe__view").append(btn);
  }
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
