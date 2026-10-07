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
    tag: string;
    badge: string;
    /** Visual title: titleBefore + rotating word + titleAfter */
    titleBefore: string;
    titleAfter: string;
    rotating: string[];
    ctaDemo: string;
  };
  console: {
    label: string;
    title: string;
    region: string;
    pause: string;
    resume: string;
    replay: string;
    chatTitle: string;
    chatSub: string;
    gatewayTitle: string;
    gatewaySub: string;
    gatewayChecks: string[];
    systemsTitle: string;
    systemsSub: string;
    tiles: string[];
    pending: string;
    stepsLabel: string;
    steps: string[];
    script: {
      query: string;
      searchDetail: string;
      searchTile: string;
      searchReply: string;
      productDetail: string;
      productTile: string;
      productName: string;
      productMeta: string;
      productStock: string;
      deliveryDetail: string;
      deliveryTile: string;
      deliveryReply: string;
      basketDetail: string;
      basketTile: string;
      basketReply: string;
      consentLabel: string;
      consentAmount: string;
      consentNote: string;
      confirm: string;
      authorized: string;
      paymentDetail: string;
      paymentTile: string;
      paymentDoneDetail: string;
      paymentDoneTile: string;
      orderDetail: string;
      orderTile: string;
      orderReplyStrong: string;
      orderReply: string;
    };
  };
  marquee: { label: string; items: string[] };
  market: { title: string; p1: string; p2: string };
  manifesto: {
    eyebrow: string;
    before: string;
    middle: string;
    agents: string;
    after: string;
  };
  whyNow: {
    title: string;
    eyebrow: string;
    heading: string;
    hint: string;
    items: { title: string; description: string; fact: string }[];
    search: {
      query: string;
      links: string;
      answerLabel: string;
      answer: string;
      offers: { merchant: string; detail: string }[];
      legend: [string, string];
    };
    protocols: {
      agents: string;
      merchants: string;
      customLabel: string;
      protocolLabel: string;
      legend: [string, string];
    };
    europe: {
      generic: string;
      genericResult: string;
      boost: string;
      boostResult: string;
      checkpoints: string[];
      legend: string[];
    };
  };
  xray: {
    eyebrow: string;
    title: string;
    lead: string;
    group: string;
    today: string;
    withBoost: string;
    note: string;
    meter: string;
    fix: string;
    undo: string;
    tagClient: string;
    tagAgent: string;
    range: string;
    shop: {
      brand: string;
      categories: string;
      crumb: string;
      title: string;
      price: string;
      stock: string;
      variant: string;
      cta: string;
      shipping: string;
      returns: string;
      reference: string;
    };
    agent: {
      request: string;
      fields: string;
      category: string;
      variants: string;
      shippingText: string;
      badges: { checkout: string; shipping: string; gtin: string; returns: string };
    };
  };
  problems: {
    title: string;
    subtitle: string;
    eyebrow: string;
    layer: string;
    items: { title: string; description: string }[];
    slabs: {
      data: string;
      checkout: string;
      payment: string;
      compliance: string;
      dataTags: string[];
      consent: string[];
      complianceTags: string[];
    };
    ready: string;
  };
  architecture: {
    eyebrow: string;
    title: string;
    lead: string;
    channelsTitle: string;
    channels: string[];
    systemsTitle: string;
    systems: string[];
    gatewayTitle: string;
    gatewaySub: string;
    gatewayChecks: string[];
    claims: { title: string; text: string }[];
  };
  pilot: {
    title: string;
    subtitle: string;
    eyebrow: string;
    steps: { title: string; description: string }[];
    cardTitle: string;
    cardText: string;
    cardCta: string;
  };
  audience: { title: string; eyebrow: string; items: string[] };
  form: {
    title: string;
    subtitle: string;
    eyebrow: string;
    gets: string[];
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
    placeholders: { website: string; platform: string; volume: string };
    errors: {
      email: string;
      name: string;
      company: string;
      website: string;
      role: string;
      platform: string;
      exploring: string;
      consent: string;
    };
    exploringOptions: { value: string; label: string }[];
    submit: string;
    submitting: string;
    success: string;
    again: string;
    error: string;
    validationError: string;
    configError: string;
    privacyNotice: string;
    privacyLinkLabel: string;
  };
  faq: {
    title: string;
    eyebrow: string;
    items: { question: string; answer: string }[];
  };
  cta: { title: string; demo: string; assess: string };
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
    h1: "Make your commerce shoppable by AI agents.",
    subtitle:
      "We connect catalogues, checkouts, payments and orders to the new AI shopping channels, via UCP, ACP and the protocols on their way. For retailers and marketplaces in Europe.",
    ctaPrimary: "Request an assessment",
    ctaSecondary: "Explore the pilot program",
    reassurance: "Built for European payments and regulation.",
    tag: "AI commerce",
    badge: "Founding pilot program open",
    titleBefore: "Make your commerce",
    titleAfter: "by AI agents.",
    rotating: ["shoppable", "comparable", "readable", "payable"],
    ctaDemo: "Watch the demo",
  },
  console: {
    label: "Simulation",
    title: "A shopping agent places an order with a merchant equipped by BoostAI",
    region: "Demo: a shopping agent places an order",
    pause: "Pause the demo",
    resume: "Resume the demo",
    replay: "Replay the demo",
    chatTitle: "AI assistant",
    chatSub: "Customer side",
    gatewayTitle: "BoostAI gateway",
    gatewaySub: "Live agent requests",
    gatewayChecks: ["Authentication", "Consent", "Monitoring"],
    systemsTitle: "Your systems",
    systemsSub: "Maison Tympan, fictional merchant",
    tiles: ["Catalogue", "Checkout", "Payment", "Orders"],
    pending: "Waiting",
    stepsLabel: "Demo steps",
    steps: ["Search", "Product page", "Delivery", "Basket", "Payment", "Order"],
    script: {
      query:
        "Find me noise-cancelling headphones for the train, max €150, delivered to Lyon before Friday.",
      searchDetail: 'q="noise-cancelling headphones" · price ≤ €150',
      searchTile: "3 products found",
      searchReply: "3 offers match. Checking the best one.",
      productDetail: "structured product page · in stock",
      productTile: "In stock · €119.00",
      productName: "Noise-cancelling wireless headphones",
      productMeta: "Maison Tympan · €119.00",
      productStock: "In stock",
      deliveryDetail: "69002 · before Friday",
      deliveryTile: "Thursday · €4.90",
      deliveryReply: "Delivery possible Thursday in Lyon, €4.90.",
      basketDetail: "1 item · €123.90 incl. VAT",
      basketTile: "Session open",
      basketReply: "Basket ready: €123.90 incl. VAT. I need your approval to pay.",
      consentLabel: "Payment approval",
      consentAmount: "€123.90 to Maison Tympan",
      consentNote: "Strong authentication required",
      confirm: "Confirm",
      authorized: "Payment authorized",
      paymentDetail: "€123.90 · strong authentication",
      paymentTile: "Strong authentication",
      paymentDoneDetail: "consent verified",
      paymentDoneTile: "Authorized",
      orderDetail: "MT-20418 · Thursday delivery",
      orderTile: "Created · MT-20418",
      orderReplyStrong: "Order MT-20418 confirmed.",
      orderReply: "Delivery on Thursday.",
    },
  },
  marquee: {
    label: "What we make readable for agents",
    items: [
      "Catalogue",
      "Price",
      "Stock",
      "Delivery",
      "Basket",
      "Checkout",
      "Payment",
      "Consent",
      "Order",
      "Returns",
    ],
  },
  market: {
    title: "Product discovery is leaving the search bar",
    p1: "AI assistants compare offers, build the basket and buy for their users.",
    p2: "Most e-commerce stacks were built for humans who click, not for agents that call APIs.",
  },
  manifesto: {
    eyebrow: "The shift",
    before: "Product discovery is leaving the search bar. AI assistants",
    middle:
      "compare offers, build the basket and buy for their users. Most e-commerce stacks were built for humans who click, not for",
    agents: "agents",
    after: "that call APIs.",
  },
  whyNow: {
    title: "Why now",
    eyebrow: "Why now",
    heading: "The market is moving on three fronts.",
    hint: "Click a card to open it.",
    items: [
      {
        title: "AI discovery channels",
        description:
          "AI assistants are becoming product discovery channels. Your customer no longer compares ten links: they read the shortlist their assistant puts in front of them.",
        fact: "Agents only keep the offers whose data they understand.",
      },
      {
        title: "Standardized interfaces",
        description:
          "UCP and ACP create standardized commerce interfaces, so there's no need for a custom integration between every agent and every merchant.",
        fact: "3 agents × 4 merchants = **12** integrations. With a shared protocol: **3 + 4**.",
      },
      {
        title: "European constraints",
        description:
          "European businesses face payment and compliance constraints that generic agent journeys often ignore.",
        fact: "GDPR, strong authentication, consumer protection, marketplace obligations.",
      },
    ],
    search: {
      query: "noise-cancelling headphones",
      links: "Search engine · 10 links to open",
      answerLabel: "AI assistant",
      answer: "The same headphones from 3 merchants, delivered before Friday",
      offers: [
        { merchant: "Sonora", detail: "Black · €115" },
        { merchant: "Maison Tympan", detail: "Sand · €119" },
        { merchant: "Ondine", detail: "Midnight blue · €124" },
      ],
      legend: ["Search", "AI assistant"],
    },
    protocols: {
      agents: "Agents",
      merchants: "Merchants",
      customLabel: "custom integrations",
      protocolLabel: "connections through a protocol",
      legend: ["No protocol", "UCP · ACP"],
    },
    europe: {
      generic: "Generic agent journey",
      genericResult: "Blocked at strong authentication",
      boost: "BoostAI journey",
      boostResult: "Payment authorized, order created",
      checkpoints: ["GDPR", "SCA", "Consumer", "Marketplace"],
      legend: ["GDPR", "SCA", "Consumer protection", "Marketplace"],
    },
  },
  xray: {
    eyebrow: "Agent reading",
    title: "Your customer sees a product page. Their agent reads data.",
    lead: "Drag the slider across the page. An agent doesn't look at your layout, it queries fields. When a field is missing, it can't close the sale.",
    group: "Product page state",
    today: "Today",
    withBoost: "With BoostAI",
    note: "Compare the same page before and after our work.",
    meter: "fields an agent can use",
    fix: "Fix the 4 fields",
    undo: "See the current state",
    tagClient: "Customer view",
    tagAgent: "Agent view",
    range: "Compare the customer view and the agent view",
    shop: {
      brand: "Maison Tympan",
      categories: "Headphones · Earbuds · Speakers",
      crumb: "Home › Headphones › Wireless",
      title: "Noise-cancelling wireless headphones",
      price: "€119.00",
      stock: "In stock",
      variant: "Colour: Sand",
      cta: "Add to cart",
      shipping: "Free fast delivery over €150",
      returns: "Returns: see our T&Cs",
      reference: "Ref. CQ-119",
    },
    agent: {
      request: "Agent request",
      fields: "application/json · 10 fields",
      category: "audio/headphones",
      variants: '["sand", "black", "midnight-blue"]',
      shippingText: "Fast delivery…",
      badges: {
        checkout: "Can't buy",
        shipping: "Free text",
        gtin: "Missing",
        returns: "In the T&Cs",
      },
    },
  },
  problems: {
    title: "Four foundations for agent-ready commerce.",
    subtitle:
      "Four building blocks that make your commerce stack readable and operable for AI shopping agents.",
    eyebrow: "What we work on",
    layer: "Layer",
    items: [
      {
        title: "AI-ready product data",
        description:
          "Structure catalogue, pricing, availability and delivery data so agents can discover your offers.",
      },
      {
        title: "Agent-compatible checkout",
        description: "Expose secure cart and checkout flows through commerce protocols.",
      },
      {
        title: "Payments and consent",
        description:
          "Connect your payment infrastructure while preserving authentication and user consent.",
      },
      {
        title: "European compliance",
        description:
          "Plan for GDPR, SCA, consumer protection and marketplace requirements.",
      },
    ],
    slabs: {
      data: "Product data",
      checkout: "Checkout",
      payment: "Payment",
      compliance: "EU compliance",
      dataTags: ["price", "stock", "delivery", "GTIN"],
      consent: ["SCA ✓", "Consent ✓"],
      complianceTags: ["GDPR", "SCA", "Consumer", "Marketplace"],
    },
    ready: "Agent-ready",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "A gateway between AI agents and your stack.",
    lead: "UCP and ACP standardize exchanges between agents and merchants. We build the layer that translates them to your systems, with authentication, consent and monitoring.",
    channelsTitle: "AI channels",
    channels: ["Conversational assistant", "Shopping agent", "AI answer engine"],
    systemsTitle: "Your systems",
    systems: ["Catalogue · PIM", "Checkout", "PSP", "Orders · OMS"],
    gatewayTitle: "BoostAI gateway",
    gatewaySub: "One entry point per protocol",
    gatewayChecks: ["Authentication", "Payment consent", "Tests and monitoring"],
    claims: [
      {
        title: "Your platform stays the reference.",
        text: "The gateway plugs into your existing infrastructure. Your e-commerce platform and PSPs remain the systems of record.",
      },
      {
        title: "One integration per protocol.",
        text: "A single entry point per protocol, instead of one integration per agent and per store.",
      },
      {
        title: "The customer stays in control.",
        text: "Agent journeys preserve strong authentication and the customer's explicit approval before every payment.",
      },
    ],
  },
  pilot: {
    title: "Become a founding pilot partner.",
    subtitle:
      "A focused program to assess readiness, connect a limited channel and define a production roadmap.",
    eyebrow: "Pilot program",
    steps: [
      {
        title: "Readiness assessment",
        description: "Review of catalogue, APIs, checkout, payments and order systems.",
      },
      {
        title: "Pilot integration",
        description: "Connect one channel, protocol or limited journey.",
      },
      {
        title: "Measurement and roadmap",
        description: "Testing, monitoring and a roadmap toward wider production rollout.",
      },
    ],
    cardTitle: "One channel, one protocol, one limited journey.",
    cardText:
      "We connect it, measure it in real conditions, then write the production roadmap with you.",
    cardCta: "Apply to the pilot",
  },
  audience: {
    title: "Built for complex commerce environments.",
    eyebrow: "Who it's for",
    items: [
      "Marketplaces",
      "Multi-country retailers",
      "Adobe Commerce and custom platforms",
      "B2B distributors",
      "Travel and booking platforms",
      "Multi-PSP or multi-vendor businesses",
    ],
  },
  form: {
    title: "Assess your agentic commerce readiness.",
    subtitle:
      "Tell us about your commerce setup. We’ll review it and get back to you within two business days.",
    eyebrow: "Assessment",
    gets: [
      "Catalogue, APIs, checkout, payments and orders reviewed",
      "The protocols that fit your stack: UCP, ACP or partners",
      "Answer within two business days",
    ],
    fields: {
      email: "Work email",
      name: "First and last name",
      company: "Company",
      website: "Company website",
      role: "Role",
      platform: "Commerce platform",
      exploring: "What are you exploring?",
      volume: "Estimated monthly order volume",
      volumeOptional: "optional",
      message: "Message",
      consent:
        "I agree to be contacted by BoostAI Consulting about this readiness assessment.",
    },
    placeholders: {
      website: "https://",
      platform: "Adobe Commerce, custom…",
      volume: "e.g. 5,000",
    },
    errors: {
      email: "Enter a valid work email, for example name@company.com.",
      name: "Enter your first and last name.",
      company: "Enter your company name.",
      website: "Enter the website address, for example https://company.com.",
      role: "Enter your role.",
      platform: "Enter your commerce platform, or “custom”.",
      exploring: "Choose what you'd like to explore.",
      consent: "Tick this box so we can get back to you.",
    },
    exploringOptions: [
      { value: "ai-product-discovery", label: "AI product discovery" },
      { value: "ucp-acp", label: "UCP or ACP integration" },
      { value: "agent-checkout", label: "Agent-compatible checkout" },
      { value: "payments-compliance", label: "Payments and compliance" },
      { value: "marketplace", label: "Marketplace integration" },
      { value: "general", label: "General readiness assessment" },
    ],
    submit: "Send the request",
    submitting: "Sending…",
    success:
      "Thanks, we’ll review your commerce setup and get back to you within two business days.",
    again: "Send another request",
    error: "Something went wrong. Please try again or email us directly.",
    validationError: "Please complete all required fields with valid information.",
    configError:
      "This form is temporarily unavailable. Please try again later or contact us via the Contact page.",
    privacyNotice:
      "Your details are used only to respond to this readiness assessment request. See our",
    privacyLinkLabel: "privacy & OCR terms",
  },
  faq: {
    title: "Frequently asked questions.",
    eyebrow: "FAQ",
    items: [
      {
        question: "What is agentic commerce?",
        answer:
          "Agentic commerce is the emerging model where AI assistants discover products, compare offers, build carts and complete purchases on behalf of users, using structured commerce interfaces rather than browsing websites like humans.",
      },
      {
        question: "What is the Universal Commerce Protocol?",
        answer:
          "The Universal Commerce Protocol (UCP) aims to standardize how AI agents interact with merchants for product discovery, checkout and related commerce actions, so every agent does not need a custom integration with every store.",
      },
      {
        question: "What is the difference between UCP and ACP?",
        answer:
          "UCP and ACP are complementary protocol initiatives in the agentic commerce space. Both define machine-readable ways for agents to interact with commerce systems; the practical fit depends on your channels, partners and technical stack. A readiness assessment maps which protocol paths matter for your environment.",
      },
      {
        question: "Can AI agents purchase directly from an online store?",
        answer:
          "Yes, when the store exposes agent-compatible capabilities for catalogue, cart, checkout, payment consent and order confirmation. Without those interfaces, agents are limited to linking users back to a human-operated website.",
      },
      {
        question: "Does UCP replace an ecommerce platform or payment provider?",
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
  cta: {
    title: "Ready to sell to AI agents",
    demo: "Watch the demo again",
    assess: "Request an assessment",
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
