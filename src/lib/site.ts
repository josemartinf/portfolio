export const site: {
  name: string;
  role: string;
  tagline: string;
  cv: string;
  /** el CV en inglés, el que enlazan las páginas bajo /en (scripts/cv.mts genera los dos) */
  cvEn: string;
  location: string;
  url: string;
  /** La marca: el dominio, escrito como firma en el pie y en el sello para clientes. */
  domain: string;
  /** La foto de José en Contacto: 432x540 (4:5), el doble de lo que ocupa en escritorio. */
  photo: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  email: string;
  linkedin: string;
  github: string;
} = {
  name: "José Martin Flores",
  role: "Software Engineer · Backend, integraciones y automatización",
  tagline: "Backend, integraciones y automatización. Más de siete años en software. Desarrollo sistemas para empresas y productos propios.",
  cv: "/cv-jose-martin-flores.pdf",
  cvEn: "/cv-jose-martin-flores-en.pdf",
  location: "Buenos Aires, Argentina",
  url: "https://www.joseflores.codes",
  domain: "joseflores.codes",
  photo: "/brand/jose-martin-flores.webp",
  whatsapp: {
    number: "5491124078165",
    display: "+54 9 11 2407-8165",
    defaultMessage: "Hola José, vi tu portafolio.",
  },
  email: "contacto@joseflores.codes",
  linkedin: "https://www.linkedin.com/in/jmfmarin/",
  github: "https://github.com/josemartinf",
};

export function whatsappHref(message?: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message ?? site.whatsapp.defaultMessage)}`;
}

export function mailtoHref(subject?: string): string {
  return `mailto:${site.email}${subject === undefined ? "" : `?subject=${encodeURIComponent(subject)}`}`;
}

/** El CV del idioma de la página. */
export function cvHref(locale: "es" | "en" = "es"): string {
  return locale === "en" ? site.cvEn : site.cv;
}
