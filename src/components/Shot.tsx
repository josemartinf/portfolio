// Captura de un proyecto con dos tamaños (800 y 1600 px de ancho): el teléfono baja la chica.
// next/image no arma srcset en un export estático sin optimizar, así que va un <img> plano.
/* eslint-disable @next/next/no-img-element */
export function Shot({ src, alt, sizes, width = 1600, height = 1000, className, eager }: { src: string; alt: string; sizes: string; width?: number; height?: number; className?: string; eager?: boolean }) {
  const small = src.replace(/\.webp$/, "-800.webp");
  return <img className={className} src={src} srcSet={`${small} 800w, ${src} 1600w`} sizes={sizes} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async" />;
}
