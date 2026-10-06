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
    chips: {
      productName: string;
      productPrice: string;
      stock: string;
      agentName: string;
      agentAction: string;
      paymentLabel: string;
      paymentDetail: string;
      order: string;
    };
  };
  lens: {
    title: string;
    hint: string;
    hintTouch: string;
    reveal: string;
    hide: string;
    label: string;
    inStock: string;
    detected: string;
    products: {
      name: string;
      price: string;
      fields: { key: string; value: string }[];
    }[];
  };
  market: { title: string; p1: string; p2: string };
  problems: {
    title: string;
    subtitle: string;
    items: { title: string; description: string; points: string[] }[];
  };
  pilot: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    previews: {
      audit: { title: string; score: string; bars: string[] };
      connect: { title: string; store: string; agent: string; status: string; logs: string[] };
      measure: { title: string; metric: string; roadmap: string[] };
    };
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
    eyebrow: "AI commerce · Retailers & marketplaces in Europe",
    h1: "Make your catalogue shoppable by AI agents",
    subtitle:
      "We connect your catalogue, checkout and payments to AI shopping assistants — via UCP, ACP and the protocols to come.",
    ctaPrimary: "Request an assessment",
    ctaSecondary: "See the pilot program",
    reassurance: "Built for European payments and regulation.",
    chips: {
      productName: "Hydra Serum 30 ml",
      productPrice: "€49",
      stock: "Stock in sync",
      agentName: "AI assistant",
      agentAction: "Basket created · 2 items",
      paymentLabel: "Payment",
      paymentDetail: "Strong authentication",
      order: "Order confirmed",
    },
  },
  lens: {
    title: "What an AI agent sees",
    hint: "Hover the catalogue",
    hintTouch: "Tap the catalogue",
    reveal: "See it all as an agent",
    hide: "Back to customer view",
    label: "AI agent view",
    inStock: "In stock",
    detected: "product",
    products: [
      {
        name: "Hydra Serum 30 ml",
        price: "€49",
        fields: [
          { key: "price", value: "49.00 EUR" },
          { key: "stock", value: "14 units" },
          { key: "delivery", value: "48 h · EU" },
          { key: "checkout", value: "UCP" },
        ],
      },
      {
        name: "Air Earbuds",
        price: "€129",
        fields: [
          { key: "price", value: "129.00 EUR" },
          { key: "stock", value: "32 units" },
          { key: "delivery", value: "24 h · FR" },
          { key: "checkout", value: "ACP" },
        ],
      },
      {
        name: "Rose Quartz Roller",
        price: "€39",
        fields: [
          { key: "price", value: "39.00 EUR" },
          { key: "stock", value: "8 units" },
          { key: "delivery", value: "48 h · EU" },
          { key: "checkout", value: "UCP" },
        ],
      },
      {
        name: "Silk Scarf",
        price: "€89",
        fields: [
          { key: "price", value: "89.00 EUR" },
          { key: "stock", value: "5 units" },
          { key: "delivery", value: "72 h · EU" },
          { key: "checkout", value: "UCP" },
        ],
      },
    ],
  },
  market: {
    title: "Your next customer may be an AI agent",
    p1: "Shoppers are starting to ask assistants to compare, build a basket and buy for them.",
    p2: "Same product, two readers. An agent doesn't see your page — it reads your data.",
  },
  problems: {
    title: "Four building blocks to become AI-shoppable",
    subtitle: "What we make readable and operable for AI shopping agents.",
    items: [
      {
        title: "AI-ready product data",
        description: "Catalogue, prices, stock and delivery structured for agents.",
        points: ["Title & attributes", "Price & currency", "Real-time stock", "Delivery options"],
      },
      {
        title: "Agent-compatible checkout",
        description: "Basket and checkout exposed securely through commerce protocols.",
        points: ["Basket created by the agent", "Address & delivery", "Order confirmation"],
      },
      {
        title: "Payments & consent",
        description: "Your payment stack connected, with authentication and consent preserved.",
        points: ["Explicit user consent", "Strong authentication (SCA)", "Your existing PSPs"],
      },
      {
        title: "European compliance",
        description: "GDPR, SCA, consumer protection and marketplace rules built in.",
        points: ["GDPR", "SCA", "Consumer protection", "Marketplace obligations"],
      },
    ],
  },
  pilot: {
    title: "Founding pilot program",
    subtitle: "Three steps to go from audit to a first live AI channel.",
    steps: [
      {
        title: "Readiness assessment",
        description: "Catalogue, APIs, checkout, payments and orders reviewed.",
      },
      {
        title: "Pilot integration",
        description: "One channel, protocol or journey connected.",
      },
      {
        title: "Measure & roadmap",
        description: "Tests, monitoring and a plan for wider rollout.",
      },
    ],
    previews: {
      audit: {
        title: "Readiness audit",
        score: "Score",
        bars: ["Catalogue", "Checkout", "Payment", "Orders"],
      },
      connect: {
        title: "Pilot connection",
        store: "Your store",
        agent: "AI agent",
        status: "Connected · UCP",
        logs: ["Catalogue synced", "Checkout exposed", "Payment verified"],
      },
      measure: {
        title: "Pilot tracking",
        metric: "Orders through agents",
        roadmap: ["Pilot", "Extension", "Production"],
      },
    },
  },
  audience: {
    title: "Built for complex commerce",
    items: [
      "Marketplaces",
      "Multi-country retailers",
      "Adobe Commerce & custom platforms",
      "B2B distributors",
      "Travel & booking",
      "Multi-PSP or multi-vendor",
    ],
  },
  whyNow: {
    title: "Why now",
    items: [
      {
        title: "AI is the new shop window",
        description: "Assistants are becoming a product discovery channel.",
      },
      {
        title: "Standards are here",
        description: "UCP and ACP avoid one integration per agent and per merchant.",
      },
      {
        title: "Europe has its own rules",
        description: "Payment and compliance constraints that generic agent flows ignore.",
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
