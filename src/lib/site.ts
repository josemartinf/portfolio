export const site: {
  name: string;
  role: string;
  tagline: string;
  cv: string;
  location: string;
  url: string;
  /** La marca: el dominio, escrito como firma en el pie y en el sello para clientes. */
  domain: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  email: string;
  linkedin: string;
  github: string;
} = {
  name: "José Martin Flores",
  role: "Software Engineer · Backend, integraciones y automatización con IA",
  tagline: "Backend, integraciones y automatización con IA. Hago sistemas de pedidos, stock y pagos que siguen funcionando cuando algo falla.",
  cv: "/cv-jose-martin-flores.pdf",
  location: "Buenos Aires, Argentina",
  url: "https://www.joseflores.codes",
  domain: "joseflores.codes",
  whatsapp: {
    number: "5491124078165",
    display: "+54 9 11 2407-8165",
    defaultMessage: "Hola José, vi tu portafolio.",
  },
  email: "jmfmarin25@gmail.com",
  linkedin: "https://www.linkedin.com/in/jmfmarin/",
  github: "https://github.com/josemartinf",
};

export function whatsappHref(message?: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message ?? site.whatsapp.defaultMessage)}`;
}

export function mailtoHref(subject?: string): string {
  return `mailto:${site.email}${subject === undefined ? "" : `?subject=${encodeURIComponent(subject)}`}`;
}
