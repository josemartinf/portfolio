/* El statement de la portada (sección propia, una vez): la moment liquid-type repartida en el titular, que ondula
   bajo el puntero y vuelve a quedar nítido; en touch y con movimiento reducido queda quieto. A la derecha, un caso
   de cada una de esas cuatro cosas, con hechos que no se repiten en el resto de la portada. */
const proof: [string, string][] = [
  ["Reintentos", "El worker de Envo reclama cada aviso con FOR UPDATE SKIP LOCKED y lo reintenta con backoff."],
  ["Idempotencia", "En Club Zapateo la preferencia de pago se crea con clave de idempotencia: un reintento no genera otra."],
  ["Alertas", "Cada noche Envo verifica stock, reservas y caja; si algo no cuadra abre una alerta crítica, y la cierra cuando vuelve a cuadrar."],
  ["Tests", "En Envo los mismos contratos corren contra PGlite y contra PostgreSQL real."],
];

export function Statement() {
  return <section className="section statement" id="como-trabajo" aria-labelledby="como-trabajo-h"><div className="wrap">
    <div className="grid statement__grid fill">
      <div className="span-5 statement__body" data-moment="liquid-type" data-moment-opts='{"strength": 0.8}'>
        <h2 id="como-trabajo-h" className="mo-lt__type">Del testing al backend</h2>
        <p className="statement__line">Empecé en QA en 2019. Por eso diseño cada sistema empezando por cómo puede fallar: reintentos, idempotencia, alertas y tests.</p>
      </div>
      <dl className="span-6 start-7 statement__proof">{proof.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div>
  </div></section>;
}
