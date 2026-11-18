import type { Education, Job } from "./types";

/** Frase del extracto de LinkedIn, para el dato duro del hero. */
export const currentFact = "Software Engineer SSR en Naranja X · en banca y fintech desde 2019";

/** Del PDF de LinkedIn. Solo lo que dice ahí: nada interno de Naranja X. */
export const jobs: Job[] = [
  {
    company: "Naranja X",
    role: "Software Engineer SSR · AI Automation",
    from: "2026-08",
    to: null,
    summary:
      "Diseño e implemento agentes de IA y sistemas multiagente con n8n y LangGraph, pipelines de RAG e integraciones por APIs REST, webhooks y MCP. Los servicios corren en AWS EKS con PostgreSQL, Kafka y Amazon MSK, y los monitoreo en producción con Datadog.",
  },
  {
    company: "Naranja X",
    role: "QA Automation Engineer SSR",
    from: "2022-02",
    to: "2026-08",
    summary:
      "Desarrollé servicios backend con TypeScript, Node.js y NestJS en arquitectura hexagonal, y procesos asíncronos con Kafka y Amazon MSK con idempotencia y patrón Outbox, con pruebas unitarias, de integración y end-to-end.",
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
    { name: "Datadog", icon: "/assets/icons/datadog.svg" },
  ] },
  { label: "Testing", items: [
    { name: "Playwright", icon: "/assets/icons/playwright.svg" },
    { name: "Vitest", icon: "/assets/icons/vitest.svg" },
  ] },
];

/** Las mismas herramientas en una sola lista. */
export const stackIcons = stackGroups.flatMap((g) => g.items);
