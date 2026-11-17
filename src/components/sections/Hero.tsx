import Image from "next/image";
import { whatsappHref } from "@/lib/site";
export function Hero() { return <section className="hero hero--split" data-enter aria-labelledby="hero-h"><div className="wrap"><div className="hero-text grid hero__grid">
  <div className="hero__text span-5"><p className="hero__kicker"><span className="dot" aria-hidden="true" />5 sitios de clientes en línea · 2 productos propios</p>
    <h1 id="hero-h">Sitios web y sistemas para negocios</h1>
    <p className="hero__lead">Hago la web de tu negocio y el sistema que la hace funcionar: tienda online, entradas con Mercado Pago, stock y ventas. Soy QA en Naranja X.</p>
    <div className="btn-row"><a className="btn btn--primary" href={whatsappHref()}>Escribir por WhatsApp</a><a className="btn btn--secondary" href="#trabajos">Ver los trabajos</a></div>
  </div>
  <div className="hero__media span-6 start-7"><Image src="/projects/zapateo-club-mobile.webp" alt="Portada completa de Club Zapateo con su logo sobre una escultura 3D" width={2560} height={1440} priority sizes="(max-width: 1023px) 100vw, 50vw" /><div className="ly-float"><div className="ly-float__row"><span className="ly-live">En línea</span><span>Trabajos reales</span></div><div className="ly-float__title">5 sitios de clientes en línea</div></div></div>
</div></div></section>; }
