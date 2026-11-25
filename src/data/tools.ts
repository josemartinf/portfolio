import type { ToolProject } from "./types";

export const tools: ToolProject[] = [
  {
    slug: "rd550-mac",
    name: "Driver Redragon SS-550 para macOS",
    tag: "personal",
    summary:
      "Un driver para usar el stream deck Redragon SS-550 en Mac, con un panel web para configurar sus 15 teclas. Lo adapté del proyecto open source redragon-streamdeck-linux.",
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
