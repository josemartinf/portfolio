import Image from "next/image";
const services = [
  ["Sitios y landings", "Una página que explica qué vendés y lleva al cliente a WhatsApp o a tu email.", "Aether Aerospace Care, MonJeep"],
  ["Tiendas online", "Catálogo con categorías, ficha de cada producto y carrito.", "Moodi Home"],
  ["Venta de entradas", "Cobro con Mercado Pago, ticket por email y control en la puerta con QR.", "Club Zapateo"],
  ["Sistemas de stock y ventas", "Productos, depósito, ventas y vendedores con su propio acceso.", "Stockie"],
  ["Automatización con IA", "Bots de WhatsApp y Telegram y flujos en n8n para tareas que hoy hacés a mano.", "Envo, postulator"],
];
export function Services() { return <section className="section" id="servicios" style={{ "--h": 2 } as React.CSSProperties} aria-labelledby="servicios-h"><div className="wrap grid grid--top">
  <div className="span-5"><div className="section-head"><h2 id="servicios-h">Servicios para tu negocio. <span className="muted">Del sitio al sistema interno.</span></h2></div>
    <ul className="rows service-rows">{services.map(([title, line, example]) => <li key={title}><span className="rows__name">{title}<small>{line}</small></span><span className="rows__value">{example}</span></li>)}</ul></div>
  <div className="span-6 start-7 service-visual"><div className="frame frame--photo"><Image src="/projects/moodi-home.webp" alt="Tienda Moodi Home con lámparas y macetas de colores" width={900} height={700} sizes="(max-width: 1023px) 100vw, 50vw" /></div></div>
</div></section>; }
