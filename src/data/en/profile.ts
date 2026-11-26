import type { Education, Job } from "../types";

/* Espejo en inglés de ../profile.ts: las mismas empresas, fechas, cargos e íconos; solo cambia el texto. */

/** La frase del perfil del CV. */
export const currentFact = "Software Engineer at Naranja X · in banking and fintech since 2020";

/** Como en ../profile.ts: nada interno de Naranja X. */
export const jobs: Job[] = [
  {
    company: "Naranja X",
    role: "Software Engineer · AI Automation",
    from: "2026-08",
    to: null,
    summary:
      "I design and build AI agents and multi-agent systems with n8n and LangGraph, RAG pipelines, and integrations over REST APIs, webhooks and MCP. I build backend services with TypeScript, Node.js and NestJS using hexagonal architecture, and asynchronous processing with Kafka (Amazon MSK), idempotency and the Outbox pattern, covered by unit, integration and end-to-end tests. They run on AWS EKS with PostgreSQL, and I monitor them in production with Datadog.",
  },
  {
    company: "Naranja X",
    role: "QA Automation Engineer",
    from: "2022-02",
    to: "2026-08",
    summary:
      "I automated end-to-end tests with Playwright, API tests, and load and performance tests.",
  },
  {
    company: "Ualá",
    role: "Software Tester / QA Specialist",
    from: "2021-04",
    to: "2022-01",
    summary:
      "Functional, regression and API testing on critical product flows, and my first test automation with Cypress and BDD (Cucumber/Gherkin).",
  },
  {
    company: "ECOSISTEMAS",
    role: "Software Tester / QA Specialist for Banco Hipotecario",
    from: "2020-09",
    to: "2021-04",
    summary:
      "Functional, regression and service testing on banking flows, with data validation in SQL Server and defect tracking in Jira.",
  },
  {
    company: "SIAHO.net",
    role: "QA Specialist",
    from: "2019-08",
    to: "2020-07",
    summary:
      "My first QA role: functional and regression test cases, API testing with Postman and SoapUI, and data validation with SQL.",
  },
];

export const education: Education = {
  school: "Universidad Nororiental Gran Mariscal de Ayacucho (UGMA)",
  degree: "Systems Engineering (Ingeniería en Sistemas)",
  from: "2013",
  to: "2017",
};

/** Los idiomas del CV y de Contacto. */
export const languages = "Native Spanish, intermediate English";

/** El stack por área, con los íconos reales de public/assets/icons. */
export const stackGroups: { label: string; items: { name: string; icon: string }[] }[] = [
  { label: "Languages and backend", items: [
    { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
    { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
    { name: "NestJS", icon: "/assets/icons/nestjs.svg" },
    { name: "Python", icon: "/assets/icons/python.svg" },
    { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
  ] },
  { label: "Data and messaging", items: [
    { name: "PostgreSQL", icon: "/assets/icons/postgres.svg" },
    { name: "MongoDB", icon: "/assets/icons/mongodb.svg" },
    { name: "Redis", icon: "/assets/icons/redis.svg" },
    { name: "Elasticsearch", icon: "/assets/icons/elasticsearch.svg" },
    { name: "Kafka", icon: "/assets/icons/kafka.svg" },
    { name: "Prisma", icon: "/assets/icons/prisma.svg" },
  ] },
  { label: "AI and automation", items: [
    { name: "LangGraph", icon: "/assets/icons/langgraph.svg" },
    { name: "n8n", icon: "/assets/icons/n8n.svg" },
  ] },
  { label: "Infrastructure", items: [
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
