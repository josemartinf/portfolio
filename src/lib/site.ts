export const site: {
  name: string;
  role: string;
  tagline: string;
  backing: string;
  location: string;
  url: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  email: string;
  linkedin: string;
  github: string;
  education: string;
  certification: string;
} = {
  name: "José Martin Flores",
  role: "Desarrollador web y automatización con IA",
  tagline: "Desarrollo sitios y sistemas web, y automatizo procesos con IA.",
  backing: "QA en Naranja X",
  location: "Buenos Aires, Argentina",
  url: "https://josemartinflores.vercel.app",
  whatsapp: {
    number: "5491124078165",
    display: "+54 9 11 2407-8165",
    defaultMessage: "Hola José, vi tu portafolio y quiero consultarte por un proyecto.",
  },
  email: "jmfmarin25@gmail.com",
  linkedin: "https://www.linkedin.com/in/jmfmarin/",
  github: "https://github.com/josemartinf",
  education: "Universidad Nororiental Gran Mariscal de Ayacucho (UGMA), 2013–2017",
  certification: "Claude Code para Programadores — Platzi (2026)",
};

export function whatsappHref(message?: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message ?? site.whatsapp.defaultMessage)}`;
}

export function mailtoHref(subject?: string): string {
  return `mailto:${site.email}${subject === undefined ? "" : `?subject=${encodeURIComponent(subject)}`}`;
}
