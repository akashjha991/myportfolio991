export const SITE_CONFIG = {
  name: "Aakash Jha",
  title: "Aakash Jha — Software Developer",
  description:
    "Software Developer specializing in Java, Full Stack Development, and product building. MCA student at ABES Engineering College. Global Rank 1799 in TCS CodeVita Season 12.",
  url: "https://aakashjha.dev",
  ogImage: "/og-image.png",
  author: "Aakash Jha",
  email: "akashjha991@gmail.com",
  github: "https://github.com/akashjha991",
  linkedin: "https://www.linkedin.com/in/akashjha991",
  resumeUrl: "/resume.pdf",
  githubUsername: "akashjha991",
} as const;

export const TYPING_ROLES = [
  "Software Developer",
  "Java Developer",
  "Full Stack Developer",
  "MCA Student",
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Products", href: "#products" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
] as const;

export const SKILL_CATEGORIES = [
  {
    title: "Programming",
    skills: ["Java", "JavaScript", "SQL", "HTML", "CSS", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot"],
  },
  {
    title: "Database",
    skills: ["MySQL", "MongoDB"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "codevita",
    title: "TCS CodeVita Season 12",
    description: "Global competitive programming rank among 300,000+ participants worldwide.",
    value: "1799",
    numericValue: 1799,
    suffix: " Global Rank",
    icon: "Trophy",
    year: "2024",
  },
  {
    id: "sql-bootcamp",
    title: "SQL Essentials Bootcamp",
    description: "Certified in SQL fundamentals, queries, joins, and database design.",
    value: "Certified",
    icon: "Database",
    year: "2024",
  },
  {
    id: "repos",
    title: "Open Source Projects",
    description: "Public repositories showcasing full-stack and systems projects.",
    value: "23+",
    numericValue: 23,
    suffix: " Repos",
    icon: "GitBranch",
    year: "2026",
  },
  {
    id: "live-products",
    title: "Live Products Shipped",
    description: "Production-deployed applications used by real users on Vercel.",
    value: "10+",
    numericValue: 10,
    suffix: " Live Apps",
    icon: "Rocket",
    year: "2026",
  },
] as const;

export const LIVE_PRODUCTS = [
  {
    id: "pokeus",
    name: "PokeUs",
    tagline: "Relationship & Couple Engagement Platform",
    description:
      "A dedicated platform for couples to stay connected through challenges, games, and shared experiences.",
    features: [
      "Couple Challenges",
      "Interactive Games",
      "Shared Experiences",
      "Real Time Activities",
      "Partner Engagement Tracking",
    ],
    liveUrl: "https://pokeus-app.onrender.com/",
    githubUrl: "https://github.com/akashjha991/PokeUs",
    status: "live" as const,
    technologies: ["TypeScript", "Next.js", "MongoDB"],
  },
  {
    id: "weather-wizard",
    name: "Weather Wizard",
    tagline: "Beautiful Weather Forecast App",
    description:
      "Real-time weather forecasts with geolocation, dark mode, and stunning weather animations.",
    features: [
      "Weather Forecast",
      "Geolocation",
      "Dark Mode",
      "Weather Animations",
    ],
    liveUrl: "https://mausam-sathi.vercel.app",
    githubUrl: "https://github.com/akashjha991/MausamSathi",
    status: "live" as const,
    technologies: ["React", "JavaScript", "Weather API"],
  },
  {
    id: "speech-emotion",
    name: "Speech Emotion Detector",
    tagline: "AI-Powered Voice Analysis",
    description:
      "Detect emotions from speech using AI processing with a comprehensive analytics dashboard.",
    features: [
      "Voice Analysis",
      "Emotion Detection",
      "AI Processing",
      "Dashboard Analytics",
    ],
    liveUrl: "https://github.com/akashjha991",
    githubUrl: "https://github.com/akashjha991",
    status: "beta" as const,
    technologies: ["Python", "AI/ML", "React"],
  },
] as const;

export const EDUCATION = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "ABES Engineering College",
    period: "2024 — Present",
    description:
      "Pursuing advanced studies in software engineering, algorithms, and modern development practices.",
    highlights: [
      "Advanced Data Structures & Algorithms",
      "Software Engineering & Design Patterns",
      "Web Technologies & Cloud Computing",
      "Database Management Systems",
    ],
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "IPEM College",
    period: "2021 — 2024",
    description:
      "Built strong foundations in programming, web development, and computer science fundamentals.",
    highlights: [
      "Core Java & Object-Oriented Programming",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL, MySQL)",
      "Data Structures & Problem Solving",
    ],
  },
] as const;

export const CERTIFICATIONS = [
  {
    id: "sql-essentials",
    title: "SQL Essentials Bootcamp",
    issuer: "Industry Certification Program",
    date: "2024",
  },
  {
    id: "codevita",
    title: "TCS CodeVita Season 12 — Global Rank 1799",
    issuer: "Tata Consultancy Services",
    date: "2024",
  },
  {
    id: "github",
    title: "GitHub Foundations",
    issuer: "Self-driven Open Source Contribution",
    date: "2021 — Present",
  },
] as const;

export const PROJECT_FILTERS = [
  "All",
  "Java",
  "React",
  "Next.js",
  "AI",
  "Full Stack",
  "Database",
] as const;

export const PROJECT_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "featured", label: "Featured" },
  { value: "technology", label: "Technology" },
] as const;

export const INTERESTS = [
  "Product Development",
  "Artificial Intelligence",
  "UI/UX Design",
  "Web Development",
  "Game Design",
] as const;
