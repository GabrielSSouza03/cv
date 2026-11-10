import type { Content } from "./types";

export const en: Content = {
  locale: "en",
  meta: {
    title: "Gabriel Simões — Backend Software Engineer",
    description:
      "Gabriel Simões is a Backend Software Engineer building APIs, integrations, and business systems with Node.js, NestJS, and TypeScript.",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitch: "Language",
    opensInNewTab: "(opens in a new tab)",
    home: "Gabriel Simões — home",
  },
  languageNames: { pt: "Português", en: "English" },
  nav: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  resume: {
    label: "Download CV",
    shortLabel: "CV",
    fileName: "Gabriel-Simoes-CV-EN.pdf",
    href: "/documents/cv-en.pdf",
  },
  hero: {
    role: "Backend Software Engineer",
    location: "Santa Rita do Sapucaí, MG",
    headline: ["Turning complex problems", "into scalable software"],
    intro:
      "Backend-focused engineer at Inatel building APIs, integrations, and business systems with Node.js, NestJS, and TypeScript — with a QA background that keeps reliability at the center.",
    ctaContact: "Get in touch",
    stackLabel: "Core stack",
    stack: ["Node.js", "TypeScript", "NestJS", "PostgreSQL"],
  },
  about: {
    heading: "Engineering beyond the code. Systems built to work, evolve, and scale.",
    paragraphs: [
      "I'm a Computer Engineer who builds backend systems — APIs, integrations, and the business software that depends on them. At Inatel I've worked across the stack with Node.js, NestJS, TypeScript, React, Next.js, Python, and PostgreSQL.",
      "I started in quality assurance, automating web and mobile tests and analyzing risk before moving into development. That path shaped how I engineer: I think about how a system fails as much as how it works, and I favor code that is tested, reviewed, and easy to change.",
      "I'm most interested in backend development, software architecture, distributed systems, and integrations — building software that stays reliable as it grows.",
    ],
    focusLabel: "Focus",
    focus: ["APIs", "Integrations", "Business systems", "Software quality"],
    portrait: {
      alt: "Portrait of Gabriel Simões smiling outdoors, with a city and green hills in the background.",
      caption: "Gabriel Simões",
    },
  },
  experience: {
    heading: "From quality assurance to building the system.",
    present: "Present",
    stackLabel: "Stack",
    durationUnits: { year: { one: "yr", other: "yrs" }, month: { one: "mo", other: "mos" } },
    organizations: [
      {
        id: "inatel",
        name: "Inatel Competence Center",
        location: "Santa Rita do Sapucaí, MG",
        roles: [
          {
            id: "systems-specialist",
            title: "Systems Specialist",
            start: { year: 2026, month: 9 },
            end: null,
            highlights: [
              "Develop and maintain full-stack web applications with Node.js, React, Next.js, and NestJS.",
              "Build and integrate RESTful APIs backed by PostgreSQL.",
              "Apply TDD, take part in code reviews, and contribute to CI/CD pipelines.",
              "Work in Agile (Scrum) teams delivering scalable software.",
            ],
            stack: ["Node.js", "TypeScript", "NestJS", "React", "Next.js", "PostgreSQL", "CI/CD"],
          },
          {
            id: "systems-developer-analyst",
            title: "Systems Developer Analyst II",
            start: { year: 2026, month: 7 },
            end: { year: 2026, month: 9 },
            highlights: [
              "Built modern, responsive interfaces with React and Next.js.",
              "Implemented integrations with external APIs.",
            ],
            stack: ["React", "Next.js", "TypeScript", "REST APIs"],
          },
          {
            id: "development-intern",
            title: "Software Development Intern",
            start: { year: 2026, month: 1 },
            end: { year: 2026, month: 7 },
            highlights: [
              "Maintained and developed software with NestJS and Next.js.",
              "Developed full-stack web applications with Node.js, React, Next.js, NestJS, Python, and Odoo ERP.",
              "Built RESTful APIs with PostgreSQL and contributed to microservices.",
            ],
            stack: ["NestJS", "Next.js", "Node.js", "React", "Python", "Odoo ERP", "PostgreSQL"],
          },
          {
            id: "qa-intern",
            title: "Software Quality Assurance Intern",
            start: { year: 2024, month: 9 },
            end: { year: 2025, month: 12 },
            highlights: [
              "Built automated tests for web applications with Robot Framework.",
              "Implemented automated tests for mobile applications with Maestro.",
              "Tested APIs with Postman and Swagger.",
              "Ran risk-based testing and managed QA activities in Jira.",
              "Worked in Scrum teams with continuous integration, bridging development and QA.",
            ],
            stack: ["Robot Framework", "Maestro", "Postman", "Swagger", "Jira"],
          },
        ],
      },
    ],
  },
  skills: {
    heading: "The tools behind the work.",
    intro:
      "Grouped by where they show up in my day-to-day work. No scores — the experience above is the evidence.",
    groups: [
      {
        id: "backend",
        label: "Backend",
        note: "Day-to-day stack for APIs and integrations.",
        items: ["Node.js", "TypeScript", "NestJS", "Python", "REST APIs", "Microservices"],
      },
      {
        id: "frontend",
        label: "Frontend",
        note: "Full-stack delivery when the product needs it.",
        items: ["React", "Next.js", "React Native", "JavaScript", "HTML", "CSS"],
      },
      {
        id: "data",
        label: "Data",
        note: "Relational modeling behind the APIs.",
        items: ["PostgreSQL", "SQL"],
      },
      {
        id: "business-systems",
        label: "Business systems",
        note: "Enterprise and ERP integrations.",
        items: ["Odoo ERP"],
      },
      {
        id: "engineering-practice",
        label: "Engineering practice",
        note: "How the work gets shipped.",
        items: ["Git", "Docker", "CI/CD", "TDD", "Code review", "Scrum"],
      },
      {
        id: "quality",
        label: "Quality engineering",
        note: "Web and mobile test automation, API testing.",
        items: ["Robot Framework", "Maestro", "Postman", "Swagger", "Jira"],
      },
    ],
  },
  education: {
    heading: "Education",
    items: [
      {
        id: "inatel-computer-engineering",
        institution: "Instituto Nacional de Telecomunicações (INATEL)",
        degree: "Bachelor's in Computer Engineering",
        completedLabel: "Completed",
        completed: { year: 2026, month: 7 },
      },
    ],
  },
  contact: {
    heading: "Let's build something reliable.",
    lead: "Open to backend and full-stack engineering roles. The fastest way to reach me is email.",
    emailLabel: "Email",
    elsewhereLabel: "Elsewhere",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};
