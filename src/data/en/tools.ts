import type { ToolProject } from "../types";

/* Espejo en inglés de ../tools.ts: la misma forma, el mismo orden y los mismos datos; solo cambia el texto. */
export const tools: ToolProject[] = [
  {
    slug: "rd550-mac",
    name: "Redragon SS-550 driver for macOS",
    tag: "personal",
    summary:
      "A driver for using the Redragon SS-550 stream deck on a Mac, with a web panel to configure its 15 keys. I adapted it from the open-source project redragon-streamdeck-linux.",
    sheet: {
      architecture: "A Node process on macOS that talks to the device over HIDAPI and serves the web panel and the REST API; a LaunchAgent starts it.",
      stack: ["Node.js", "TypeScript", "Express", "HIDAPI (node-hid)", "CoreAudio", "LaunchAgent"],
      practices: ["Tests with node:test", "Type checking", "PR-based workflow"],
      patterns: [],
      short: {
        architecture: "A Node process with HIDAPI, the web panel and the REST API",
        stack: "Node.js, TypeScript, Express, node-hid, CoreAudio",
        practices: "node:test, type checking and PR-based workflow",
      },
    },
    shot: {
      src: "/projects/rd550-panel.webp",
      alt: "The SS-550 driver's web panel with the 15-key grid and the editor for one key",
      frame: "browser",
      title: "Driver panel",
    },
  },
];
