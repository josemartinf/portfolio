import { mailtoHref, site } from "@/lib/site";
import type { Locale } from "@/i18n";
import { ui } from "@/i18n/ui";

/**
 * La dirección de email escrita (se lee y se puede seleccionar aunque no haya un cliente de correo) y un botón para
 * copiarla, el botón lleno del cierre. Lo que dice al copiar (en su idioma) va en sus data-*, que lee site.js. El botón nace oculto y lo muestra public/site.js: sin script queda la dirección, que también es un mailto.
 */
export function EmailCopy({ className, locale = "es" }: { className?: string; locale?: Locale }) {
  const t = ui[locale].contact;
  return <p className={`email-copy${className ? ` ${className}` : ""}`}>
    <a className="email-copy__addr" href={mailtoHref()}>{site.email}</a>
    <button type="button" className="btn btn--primary email-copy__btn" data-copy={site.email} data-copied={t.copied} data-copied-status={t.copiedStatus} data-copy-failed={t.copyFailed} hidden>{t.copy}</button>
    <span className="sr-only" role="status" data-copy-status="" />
  </p>;
}
