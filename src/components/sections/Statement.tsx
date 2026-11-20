/* El statement de la portada (sección propia, una vez, justo después del hero: es lo que distingue el perfil): la moment liquid-type repartida en el titular, que ondula
   bajo el puntero y vuelve a quedar nítido; en touch y con movimiento reducido queda quieto. A la derecha, un caso
   de cada una de esas cuatro cosas, dicho como resultado: el mecanismo (la outbox, la idempotencia, los motores de
   prueba) vive en la página de cada caso. */
const proof: [string, string][] = [
  ["Ningún aviso se pierde", "Si Telegram o WhatsApp se caen, Envo guarda el aviso y lo manda cuando el canal vuelve."],
  ["Ningún cobro doble", "En Club Zapateo, si un pago se reintenta, no se cobra ni se emite una entrada dos veces."],
  ["Controles cada noche", "Envo revisa que el stock, las reservas y la caja cuadren; si algo no cierra, abre una alerta y la cierra cuando vuelve a cuadrar."],
  ["Probado contra la base real", "Las pruebas de Envo corren también contra PostgreSQL de verdad, no solo contra una copia en memoria."],
];

export function Statement() {
  return <section className="section statement" id="como-trabajo" aria-labelledby="como-trabajo-h"><div className="wrap">
    <div className="grid statement__grid fill">
      <div className="span-5 statement__body" data-moment="liquid-type" data-moment-opts='{"strength": 0.8}'>
        <h2 id="como-trabajo-h" className="mo-lt__type">Del testing al backend</h2>
        <p className="statement__line">Empecé en QA en 2019 y hoy desarrollo en Naranja X. Antes de construir algo, defino qué pasa si un mensaje no llega, si un pago entra dos veces o si un servicio se cae.</p>
      </div>
      <dl className="span-6 start-7 statement__proof">{proof.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div>
  </div></section>;
}
