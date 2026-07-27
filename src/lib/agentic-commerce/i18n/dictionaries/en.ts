export type Dictionary = {
  meta: { title: string; description: string; ogAlt: string };
  nav: {
    problems: string;
    pilot: string;
    audience: string;
    faq: string;
    assess: string;
    switchLabel: string;
    switchHref: string;
    homeLabel: string;
  };
  hero: {
    brand: string;
    eyebrow: string;
    h1: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    reassurance: string;
    flow: { assistants: string; gateway: string; systems: string };
  };
  market: { title: string; p1: string; p2: string };
  problems: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  pilot: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  audience: { title: string; items: string[] };
  whyNow: {
    title: string;
    items: { title: string; description: string }[];
  };
  form: {
    title: string;
    subtitle: string;
    fields: {
      email: string;
      name: string;
      company: string;
      website: string;
      role: string;
      platform: string;
      exploring: string;
      volume: string;
      volumeOptional: string;
      message: string;
      consent: string;
    };
    exploringOptions: { value: string; label: string }[];
    submit: string;
    submitting: string;
    success: string;
    error: string;
    validationError: string;
    configError: string;
    privacyNotice: string;
    privacyLinkLabel: string;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  footer: {
    tagline: string;
    contact: string;
    privacy: string;
    home: string;
    rights: string;
  };
};

export const en: Dictionary = {
  meta: {
    title:
      "Agentic Commerce by BoostAI Consulting | Readiness Assessment & Pilot",
    description:
      "Prepare your commerce platform for AI shopping agents. BoostAI Consulting helps retailers and marketplaces assess readiness and run founding pilots across UCP, ACP and emerging commerce protocols.",
    ogAlt: "Agentic Commerce by BoostAI Consulting",
  },
  nav: {
    problems: "Capabilities",
    pilot: "Pilot",
    audience: "Who it's for",
    faq: "FAQ",
    assess: "Request assessment",
    switchLabel: "FR",
    switchHref: "/fr/agentic-commerce",
    homeLabel: "BoostAI Consulting",
  },
  hero: {
    brand: "Agentic Commerce by BoostAI Consulting",
    eyebrow: "Agentic commerce for European retailers & marketplaces",
    h1: "Make your commerce ready for AI agents",
    subtitle:
      "We help retailers and marketplaces connect their product data, checkout, payments and order systems to AI shopping channels — across UCP, ACP and emerging commerce protocols.",
    ctaPrimary: "Request a readiness assessment",
    ctaSecondary: "Explore the pilot program",
    reassurance: "Built for European commerce, payments and compliance.",
    flow: {
      assistants: "AI assistants",
      gateway: "Commerce gateway",
      systems: "Catalogue, checkout, payment, orders",
    },
  },
  market: {
    title: "Your next customer may be an AI agent",
    p1: "Product discovery is moving from search results to AI-generated recommendations. The next step is already emerging: assistants that compare products, build carts and complete purchases directly for their users.",
    p2: "Most commerce systems were built for human-operated websites — not for autonomous agents.",
  },
  problems: {
    title: "What we help you solve",
    subtitle:
      "Four foundations to make your commerce stack readable and operable by AI shopping agents.",
    items: [
      {
        title: "AI-ready product data",
        description:
          "Structure product, pricing, availability and delivery data for AI discovery.",
      },
      {
        title: "Agent-compatible checkout",
        description:
          "Expose secure cart and checkout capabilities through commerce protocols.",
      },
      {
        title: "Payments and consent",
        description:
          "Connect existing payment infrastructure while preserving authentication and user consent.",
      },
      {
        title: "European compliance",
        description:
          "Prepare for GDPR, SCA, consumer protection and marketplace requirements.",
      },
    ],
  },
  pilot: {
    title: "Become a founding pilot partner",
    subtitle:
      "A focused program to assess readiness, connect a limited channel, and define a production roadmap.",
    steps: [
      {
        title: "Readiness assessment",
        description:
          "Analysis of your catalogue, APIs, checkout, payments and order systems.",
      },
      {
        title: "Pilot integration",
        description:
          "Connection of a limited channel, protocol or shopping journey.",
      },
      {
        title: "Measurement and roadmap",
        description:
          "Tests, monitoring and a roadmap toward broader production rollout.",
      },
    ],
  },
  audience: {
    title: "Built for complex commerce environments",
    items: [
      "Marketplaces",
      "Multi-country retailers",
      "Adobe Commerce and custom commerce platforms",
      "B2B distributors",
      "Travel and booking platforms",
      "Businesses operating multiple PSPs or sellers",
    ],
  },
  whyNow: {
    title: "Why now",
    items: [
      {
        title: "AI discovery channels",
        description: "AI assistants are becoming product-discovery channels.",
      },
      {
        title: "Standardized interfaces",
        description:
          "UCP and ACP are creating standardized commerce interfaces — reducing one-off agent-to-merchant integrations.",
      },
      {
        title: "European constraints",
        description:
          "European businesses face specific payment and compliance constraints that generic agent flows often ignore.",
      },
    ],
  },
  form: {
    title: "Assess your agentic commerce readiness",
    subtitle:
      "Tell us about your commerce setup. We’ll review it and get back to you within two business days.",
    fields: {
      email: "Work email",
      name: "First and last name",
      company: "Company",
      website: "Company website",
      role: "Role",
      platform: "Commerce platform",
      exploring: "What are you exploring?",
      volume: "Estimated monthly order volume",
      volumeOptional: "Optional",
      message: "Message",
      consent:
        "I agree to be contacted by BoostAI Consulting about this readiness assessment.",
    },
    exploringOptions: [
      { value: "ai-product-discovery", label: "AI product discovery" },
      { value: "ucp-acp", label: "UCP or ACP integration" },
      { value: "agent-checkout", label: "Agent-compatible checkout" },
      { value: "payments-compliance", label: "Payments and compliance" },
      { value: "marketplace", label: "Marketplace integration" },
      { value: "general", label: "General readiness assessment" },
    ],
    submit: "Submit assessment request",
    submitting: "Sending…",
    success:
      "Thanks — we’ll review your commerce setup and get back to you within two business days.",
    error: "Something went wrong. Please try again or email us directly.",
    validationError: "Please complete all required fields with valid information.",
    configError:
      "This form is temporarily unavailable. Please try again later or contact us via the Contact page.",
    privacyNotice:
      "Your details are used only to respond to this readiness assessment request. See our",
    privacyLinkLabel: "privacy & OCR terms",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "What is agentic commerce?",
        answer:
          "Agentic commerce is the emerging model where AI assistants discover products, compare offers, build carts and complete purchases on behalf of users — using structured commerce interfaces rather than browsing websites like humans.",
      },
      {
        question: "What is the Universal Commerce Protocol?",
        answer:
          "The Universal Commerce Protocol (UCP) aims to standardize how AI agents interact with merchants for product discovery, checkout and related commerce actions — so every agent does not need a custom integration with every store.",
      },
      {
        question: "What is the difference between UCP and ACP?",
        answer:
          "UCP and ACP are complementary protocol initiatives in the agentic commerce space. Both define machine-readable ways for agents to interact with commerce systems; the practical fit depends on your channels, partners and technical stack. A readiness assessment maps which protocol paths matter for your environment.",
      },
      {
        question: "Can AI agents purchase directly from an online store?",
        answer:
          "Yes — when the store exposes agent-compatible capabilities for catalogue, cart, checkout, payment consent and order confirmation. Without those interfaces, agents are limited to linking users back to a human-operated website.",
      },
      {
        question:
          "Does UCP replace an ecommerce platform or payment provider?",
        answer:
          "No. UCP-style protocols sit as interfaces between AI channels and your existing commerce, checkout and payment infrastructure. Your platform and PSPs remain the systems of record.",
      },
      {
        question: "How can a retailer prepare for AI shopping agents?",
        answer:
          "Start by structuring product and availability data, clarifying checkout and payment consent flows, identifying protocol targets (UCP, ACP or partner-specific), and running a limited pilot before a broader rollout.",
      },
      {
        question: "What are the European compliance requirements?",
        answer:
          "European deployments typically need to account for GDPR, Strong Customer Authentication (SCA), consumer protection rules, and marketplace obligations when multiple sellers or PSPs are involved. Agent flows must preserve authentication and user consent.",
      },
    ],
  },
  footer: {
    tagline:
      "Agentic Commerce by BoostAI Consulting — readiness assessments and founding pilot programs for European retailers and marketplaces.",
    contact: "Contact",
    privacy: "OCR terms & privacy",
    home: "BoostAI Consulting",
    rights: "All rights reserved.",
  },
};
