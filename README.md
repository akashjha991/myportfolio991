# Aakash Jha — Premium Portfolio

A modern SaaS-style personal portfolio built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

- Premium glassmorphism UI with dark/light mode
- Animated hero with typing effect, particles, and gradient backgrounds
- Project CMS via `data/projects.json` with search, filter, and sort
- Dynamic project detail pages
- Live GitHub analytics dashboard
- Command palette (`Ctrl+K`)
- Contact form with Resend integration
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots.txt
- Blog-ready architecture

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
RESEND_API_KEY=your_resend_key      # Optional — enables email delivery
CONTACT_EMAIL=akashjha991@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

## Project Structure

```
app/           → Pages, API routes, layout
components/    → UI components and sections
data/          → projects.json (CMS)
hooks/         → React Query hooks
lib/           → Utilities, GitHub API, SEO
public/        → Static assets (add resume.pdf here)
types/         → TypeScript definitions
```

## Adding Projects

Edit `data/projects.json` — each project auto-generates a detail page at `/projects/[slug]`.

## Resume

Place your resume at `public/resume.pdf` for the download button to work.
