export const site: {
  name: string;
  role: string;
  tagline: string;
  cv: string;
  location: string;
  url: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  email: string;
  linkedin: string;
  github: string;
} = {
  name: "José Martin Flores",
  role: "Software Engineer · Backend, integraciones y automatización con IA",
  tagline: "Diseño backend, integraciones y automatización con IA empezando por cómo pueden fallar.",
  cv: "/cv-jose-martin-flores.pdf",
  location: "Buenos Aires, Argentina",
  url: "https://www.joseflores.codes",
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
