// Captura de un proyecto. Las de escritorio vienen en dos tamaños (800 y 1600 px de ancho) y el teléfono
// baja la chica; las de teléfono (780×1688) tienen un solo archivo, así que van sin srcset.
// next/image no arma srcset en un export estático sin optimizar, así que va un <img> plano.
/* eslint-disable @next/next/no-img-element */
export function Shot({ src, alt, sizes, frame = "browser", className, eager, height = 1000 }: { src: string; alt: string; sizes?: string; frame?: "browser" | "phone"; className?: string; eager?: boolean; height?: number }) {
  const loading = eager ? "eager" : "lazy";
  if (frame === "phone") return <img className={className} src={src} alt={alt} width={780} height={1688} loading={loading} decoding="async" />;
  const small = src.replace(/\.webp$/, "-800.webp");
  return <img className={className} src={src} srcSet={`${small} 800w, ${src} 1600w`} sizes={sizes ?? "100vw"} alt={alt} width={1600} height={height} loading={loading} decoding="async" />;
}
