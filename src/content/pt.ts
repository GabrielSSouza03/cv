import type { Content } from "./types";

export const pt: Content = {
  locale: "pt",
  meta: {
    title: "Gabriel Simões | Engenheiro de Software Backend",
    description:
      "Gabriel Simões é Engenheiro de Software Backend e desenvolve APIs, integrações e sistemas de negócio com Node.js, NestJS e TypeScript.",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    primaryNav: "Principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageSwitch: "Idioma",
    opensInNewTab: "(abre em nova aba)",
    home: "Gabriel Simões, início",
  },
  languageNames: { pt: "Português", en: "English" },
  nav: {
    about: "Sobre",
    experience: "Experiência",
    skills: "Habilidades",
    education: "Formação",
    contact: "Contato",
  },
  resume: {
    label: "Baixar currículo",
    shortLabel: "CV",
    fileName: "Gabriel-Simoes-CV-PT.pdf",
    href: "/documents/cv-pt.pdf",
  },
  hero: {
    role: "Engenheiro de Software Backend",
    location: "Santa Rita do Sapucaí, MG",
    headline: ["Transformando problemas", "complexos em software", "escalável"],
    intro:
      "Engenheiro com foco em backend no Inatel, desenvolvendo APIs, integrações e sistemas de negócio com Node.js, NestJS e TypeScript, com uma base em QA que mantém a confiabilidade no centro.",
    ctaContact: "Entre em contato",
    stackLabel: "Stack principal",
    stack: ["Node.js", "TypeScript", "NestJS", "PostgreSQL"],
  },
  about: {
    heading: "Engenharia além do código. Sistemas feitos para funcionar, evoluir e escalar.",
    paragraphs: [
      "Sou Engenheiro da Computação e desenvolvo sistemas backend: APIs, integrações e os sistemas de negócio que dependem delas. No Inatel, atuo em toda a stack com Node.js, NestJS, TypeScript, React, Next.js, Python e PostgreSQL.",
      "Comecei em garantia de qualidade, automatizando testes web e mobile e analisando riscos, antes de migrar para o desenvolvimento. Essa trajetória moldou minha forma de construir software: penso em como um sistema falha tanto quanto em como ele funciona, e priorizo código testado, revisado e fácil de evoluir.",
      "Tenho interesse especial em desenvolvimento backend, arquitetura de software, sistemas distribuídos e integrações, construindo software que continua confiável à medida que cresce.",
    ],
    focusLabel: "Foco",
    focus: ["APIs", "Integrações", "Sistemas de negócio", "Qualidade de software"],
    portrait: {
      alt: "Retrato de Gabriel Simões sorrindo ao ar livre, com uma cidade e morros verdes ao fundo.",
      caption: "Gabriel Simões",
    },
  },
  experience: {
    heading: "Da garantia de qualidade à construção do sistema.",
    present: "Atual",
    stackLabel: "Stack",
    durationUnits: { year: { one: "ano", other: "anos" }, month: { one: "mês", other: "meses" } },
    organizations: [
      {
        id: "inatel",
        name: "Inatel Competence Center",
        location: "Santa Rita do Sapucaí, MG",
        roles: [
          {
            id: "systems-specialist",
            title: "Especialista em Sistemas",
            start: { year: 2026, month: 9 },
            end: null,
            highlights: [
              "Desenvolvo e mantenho aplicações web full stack com Node.js, React, Next.js e NestJS.",
              "Desenvolvo e integro APIs RESTful com PostgreSQL.",
              "Aplico TDD, participo de revisões de código e contribuo com pipelines de CI/CD.",
              "Atuo em times ágeis (Scrum) entregando software escalável.",
            ],
            stack: ["Node.js", "TypeScript", "NestJS", "React", "Next.js", "PostgreSQL", "CI/CD"],
          },
          {
            id: "systems-developer-analyst",
            title: "Analista Desenvolvedor de Sistemas II",
            start: { year: 2026, month: 7 },
            end: { year: 2026, month: 9 },
            highlights: [
              "Desenvolvi interfaces modernas e responsivas com React e Next.js.",
              "Implementei integrações com APIs externas.",
            ],
            stack: ["React", "Next.js", "TypeScript", "REST APIs"],
          },
          {
            id: "development-intern",
            title: "Estagiário de Desenvolvimento",
            start: { year: 2026, month: 1 },
            end: { year: 2026, month: 7 },
            highlights: [
              "Atuei na manutenção e no desenvolvimento de software com NestJS e Next.js.",
              "Desenvolvi aplicações web full stack com Node.js, React, Next.js, NestJS, Python e Odoo ERP.",
              "Desenvolvi APIs RESTful com PostgreSQL e contribuí com microsserviços.",
            ],
            stack: ["NestJS", "Next.js", "Node.js", "React", "Python", "Odoo ERP", "PostgreSQL"],
          },
          {
            id: "qa-intern",
            title: "Estagiário de Garantia de Qualidade de Software",
            start: { year: 2024, month: 9 },
            end: { year: 2025, month: 12 },
            highlights: [
              "Desenvolvi testes automatizados para aplicações web com Robot Framework.",
              "Implementei testes automatizados para aplicações mobile com Maestro.",
              "Realizei testes de APIs com Postman e Swagger.",
              "Realizei testes baseados em análise de riscos e gerenciei as atividades de QA no Jira.",
              "Atuei em times Scrum com integração contínua, fazendo a ponte entre desenvolvimento e QA.",
            ],
            stack: ["Robot Framework", "Maestro", "Postman", "Swagger", "Jira"],
          },
        ],
      },
    ],
  },
  skills: {
    heading: "As ferramentas por trás do trabalho.",
    intro:
      "Agrupadas pelo lugar onde aparecem no meu dia a dia. Sem notas. A experiência acima é a evidência.",
    groups: [
      {
        id: "backend",
        label: "Backend",
        note: "Stack do dia a dia para APIs e integrações.",
        items: ["Node.js", "TypeScript", "NestJS", "Python", "REST APIs", "Microservices"],
      },
      {
        id: "frontend",
        label: "Frontend",
        note: "Entrega full stack quando o produto pede.",
        items: ["React", "Next.js", "React Native", "JavaScript", "HTML", "CSS"],
      },
      {
        id: "data",
        label: "Dados",
        note: "Modelagem relacional por trás das APIs.",
        items: ["PostgreSQL", "SQL"],
      },
      {
        id: "business-systems",
        label: "Sistemas de negócio",
        note: "Integrações corporativas e de ERP.",
        items: ["Odoo ERP"],
      },
      {
        id: "engineering-practice",
        label: "Práticas de engenharia",
        note: "Como o trabalho chega à produção.",
        items: ["Git", "Docker", "CI/CD", "TDD", "Code review", "Scrum"],
      },
      {
        id: "quality",
        label: "Engenharia de qualidade",
        note: "Automação de testes web e mobile, testes de API.",
        items: ["Robot Framework", "Maestro", "Postman", "Swagger", "Jira"],
      },
    ],
  },
  education: {
    heading: "Formação",
    items: [
      {
        id: "inatel-computer-engineering",
        institution: "Instituto Nacional de Telecomunicações (INATEL)",
        degree: "Bacharelado em Engenharia de Computação",
        completedLabel: "Concluído",
        completed: { year: 2026, month: 7 },
      },
    ],
  },
  contact: {
    heading: "Vamos construir algo?",
    lead: "Aberto a oportunidades em engenharia backend e full stack. O caminho mais rápido é por e-mail.",
    emailLabel: "E-mail",
    elsewhereLabel: "Outros canais",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
};
