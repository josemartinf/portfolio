import type { NextConfig } from "next";
// globalNotFound: el sitio tiene un layout raíz por idioma ((es) y (en)), así que el 404 es global-not-found.tsx
const nextConfig: NextConfig = { output: "export", images: { unoptimized: true }, trailingSlash: false, experimental: { globalNotFound: true } };
export default nextConfig;
