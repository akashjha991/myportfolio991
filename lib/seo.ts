import { SITE_CONFIG } from "./constants";

export function getJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/profile.jpg`,
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "ABES Engineering College",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "IPEM College",
      },
      {
        "@type": "EducationalOrganization",
        name: "ABES Engineering College",
      },
    ],
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
    knowsAbout: [
      "Java",
      "Full Stack Development",
      "React",
      "Next.js",
      "Data Structures",
      "Algorithms",
      "Web Development",
    ],
    email: SITE_CONFIG.email,
    description: SITE_CONFIG.description,
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
  };
}
