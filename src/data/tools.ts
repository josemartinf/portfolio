import type { ToolProject } from "./types";

export const tools: ToolProject[] = [
  {
    slug: "rd550-mac",
    name: "Driver Redragon SS-550 para macOS",
    summary:
      "Driver de macOS con panel web para el stream deck SS-550, de 15 teclas LCD. Porté el protocolo desde un proyecto open source de Linux con licencia MIT (redragon-streamdeck-linux), de libusb a HIDAPI.",
    layers: [
      "Render en memoria: solo se envían las teclas que cambiaron, con diff por hash, caché LRU y una sola confirmación por lote. La carga de página bajó de 1535 a 860 ms",
      "Integraciones con Spotify, Discord, OBS y Claude Code: una tecla física aprueba o rechaza permisos y otra muestra el uso",
      "Estado en vivo del micrófono del sistema por CoreAudio, y del micrófono y la cámara de Meet por una extensión",
      "Panel web para arrastrar teclas, con editor con vista previa, páginas y carpetas, sobre una API REST de unas 45 rutas",
      "Arranque con LaunchAgent",
    ],
    sheet: {
      architecture: "Un proceso Node en macOS que habla con el dispositivo por HIDAPI y sirve el panel web y la API REST; arranca con LaunchAgent.",
      stack: ["Node.js", "TypeScript", "Express", "HIDAPI (node-hid)", "CoreAudio", "LaunchAgent"],
      practices: ["Tests con node:test", "Typecheck", "Trabajo por PRs"],
      patterns: [],
      short: {
        architecture: "Un proceso Node con HIDAPI, el panel web y la API REST",
        stack: "Node.js, TypeScript, Express, node-hid, CoreAudio",
        practices: "node:test, typecheck y trabajo por PRs",
      },
    },
    shot: {
      src: "/projects/rd550-panel.webp",
      alt: "Panel web del driver SS-550 con la grilla de 15 teclas y el editor de una tecla",
      frame: "browser",
      title: "Panel del driver",
    },
  },
];
