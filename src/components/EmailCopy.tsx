import { mailtoHref, site } from "@/lib/site";

/**
 * La dirección de email escrita (se lee y se puede seleccionar aunque no haya un cliente de correo) y un botón para
 * copiarla, el botón lleno del cierre. El botón nace oculto y lo muestra public/site.js: sin script queda la dirección, que también es un mailto.
 */
export function EmailCopy({ className }: { className?: string }) {
  return <p className={`email-copy${className ? ` ${className}` : ""}`}>
    <a className="email-copy__addr" href={mailtoHref()}>{site.email}</a>
    <button type="button" className="btn btn--primary email-copy__btn" data-copy={site.email} hidden>Copiar el email</button>
    <span className="sr-only" role="status" data-copy-status="" />
  </p>;
}
