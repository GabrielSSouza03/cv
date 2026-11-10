export const technologies = [
  "Node.js",
  "TypeScript",
  "NestJS",
  "Python",
  "REST APIs",
  "Microservices",
  "React",
  "Next.js",
  "React Native",
  "JavaScript",
  "HTML",
  "CSS",
  "PostgreSQL",
  "SQL",
  "Odoo ERP",
  "Git",
  "Docker",
  "CI/CD",
  "TDD",
  "Code review",
  "Scrum",
  "Robot Framework",
  "Maestro",
  "Postman",
  "Swagger",
  "Jira",
] as const;

export type Tech = (typeof technologies)[number];

export const person = {
  name: "Gabriel Simões",
  fullName: "Gabriel Simões de Souza",
  email: "gabriel.simoes@gec.inatel.br",
  links: {
    linkedin: "https://www.linkedin.com/in/gabriel-sim%C3%B5es-de-souza",
    github: "https://github.com/GabrielSSouza03",
  },
} as const;

export const sectionIds = ["about", "experience", "skills", "education", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
