import type { Education, Job } from "./types";

/** La frase del perfil del CV. SIAHO.net era de otro rubro: banca y fintech desde Banco Hipotecario (2020). */
export const currentFact: string = "Software Engineer en Naranja X · en banca y fintech desde 2020";

/** Del PDF de LinkedIn y lo que confirmó José (2026-11-25): el desarrollo backend es del puesto actual y la etapa de QA
 *  es solo de pruebas. Nada interno de Naranja X. */
export const jobs: Job[] = [
  {
    company: "Naranja X",
    role: "Software Engineer · AI Automation",
    from: "2026-08",
    to: null,
    summary:
      "Diseño e implemento agentes de IA y sistemas multiagente con n8n y LangGraph, pipelines de RAG e integraciones por APIs REST, webhooks y MCP. Desarrollo servicios backend con TypeScript, Node.js y NestJS en arquitectura hexagonal, y procesos asíncronos con Kafka (Amazon MSK), idempotencia y patrón Outbox, con pruebas unitarias, de integración y end-to-end. Corren en AWS EKS con PostgreSQL y los monitoreo en producción con Datadog.",
  },
  {
    company: "Naranja X",
    role: "QA Automation Engineer",
    from: "2022-02",
    to: "2026-08",
    summary:
      "Automaticé pruebas end-to-end con Playwright, pruebas de API y pruebas de carga y rendimiento.",
  },
  {
    company: "Ualá",
    role: "Software Tester / QA Specialist",
    from: "2021-04",
    to: "2022-01",
    summary:
      "Pruebas funcionales, de regresión y de APIs sobre flujos críticos de producto, y mis primeras automatizaciones con Cypress y BDD (Cucumber/Gherkin).",
  },
  {
    company: "ECOSISTEMAS",
    role: "Software Tester / QA Specialist para Banco Hipotecario",
    from: "2020-09",
    to: "2021-04",
    summary:
      "Pruebas funcionales, de regresión y de servicios sobre flujos bancarios, con validación de datos en SQL Server y seguimiento de defectos en Jira.",
  },
  {
    company: "SIAHO.net",
    role: "QA Specialist",
    from: "2019-08",
    to: "2020-07",
    summary:
      "Mi primer rol en QA: casos de prueba funcionales y de regresión, pruebas de APIs con Postman y SoapUI, y validación de datos con SQL.",
  },
];

export const education: Education = {
  school: "Universidad Nororiental Gran Mariscal de Ayacucho (UGMA)",
  degree: "Ingeniería en Sistemas",
  from: "2013",
  to: "2017",
};

/** Los idiomas del CV y de Contacto. */
export const languages: string = "Español nativo, inglés intermedio";

/** El stack por área, con los íconos reales de public/assets/icons. */
export const stackGroups: { label: string; items: { name: string; icon: string }[] }[] = [
  { label: "Lenguajes y backend", items: [
    { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
    { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
    { name: "NestJS", icon: "/assets/icons/nestjs.svg" },
    { name: "Python", icon: "/assets/icons/python.svg" },
    { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
  ] },
  { label: "Datos y mensajería", items: [
    { name: "PostgreSQL", icon: "/assets/icons/postgres.svg" },
    { name: "MongoDB", icon: "/assets/icons/mongodb.svg" },
    { name: "Redis", icon: "/assets/icons/redis.svg" },
    { name: "Elasticsearch", icon: "/assets/icons/elasticsearch.svg" },
    { name: "Kafka", icon: "/assets/icons/kafka.svg" },
    { name: "Prisma", icon: "/assets/icons/prisma.svg" },
  ] },
  { label: "IA y automatización", items: [
    { name: "LangGraph", icon: "/assets/icons/langgraph.svg" },
    { name: "n8n", icon: "/assets/icons/n8n.svg" },
  ] },
  { label: "Infraestructura", items: [
    { name: "AWS", icon: "/assets/icons/aws.svg" },
    { name: "Kubernetes", icon: "/assets/icons/kubernetes.svg" },
    { name: "Docker", icon: "/assets/icons/docker.svg" },
    { name: "GitLab", icon: "/assets/icons/gitlab.svg" },
    { name: "GitHub", icon: "/assets/icons/github.svg" },
    { name: "Datadog", icon: "/assets/icons/datadog.svg" },
  ] },
  { label: "Testing", items: [
    { name: "Playwright", icon: "/assets/icons/playwright.svg" },
    { name: "Vitest", icon: "/assets/icons/vitest.svg" },
  ] },
];

/** Las mismas herramientas en una sola lista. */
export const stackIcons = stackGroups.flatMap((g) => g.items);
