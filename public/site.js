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
      btn.textContent = "Copiado";
      if (status) status.textContent = "Email copiado";
    } catch {
      btn.textContent = "No se pudo copiar";
    }
    clearTimeout(timer);
    timer = setTimeout(() => { btn.textContent = label; if (status) status.textContent = ""; }, 2000);
  });
}
