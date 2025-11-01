# Project Requirements Document (PRD)

## 1. Project Overview

Flumberico is the public-facing landing page for an AI-powered job hunting service. Its main purpose is to inform visitors about the service, demonstrate its unique problem-solving capabilities, and convert prospects into waitlist sign-ups or referrals. Built with Next.js and styled in Tailwind CSS, the site leverages server-side rendering (SSR) and static site generation (SSG) to deliver fast load times, strong SEO, and a seamless browsing experience.

This landing page is being built to generate awareness, collect qualified leads, and position Flumberico as a modern, trustworthy solution in the crowded job search market. Success will be measured by key metrics such as page load performance (Lighthouse score ≥ 90), conversion rate on CTAs (join waitlist/referral), and SEO rankings for target keywords.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (First Version)
- Responsive multi-page website using Next.js App Router
- Core pages: Home, About Us, How It Works, Pricing, FAQ, Contact, Privacy Policy, Terms of Service
- Thematic sections on Home: Hero, Problem, Solution, Features, Testimonials, Final CTA
- Interactive, multi-step onboarding form (waitlist sign-up) with animated transitions
- Referral CTA section with entry form
- Tailwind CSS utility-first styling, custom themes via `globals.css`
- Framer Motion animations for page elements and form transitions
- SEO metadata and structured data (JSON-LD) configured per page
- Deployment pipeline on Vercel (SSG/SSR configuration)

### Out-of-Scope (Later Phases)
- Full backend integration for AI job matching (data will be stubbed)
- Headless CMS for content management
- Social login or OAuth (e.g., LinkedIn, Google)
- Real payment processing or subscription management
- Multi-language localization
- Advanced analytics dashboards (beyond basic Google Analytics)
- Unit/integration tests (introduced in subsequent sprints)

## 3. User Flow

A new visitor lands on the Flumberico homepage via organic search or an ad. They see a prominent hero section with a headline, brief description, and “Join the Waitlist” button. As they scroll, they encounter sections that outline the problem in today’s job market, present Flumberico’s AI-driven solution, highlight key features (e.g., personalized job matches), and showcase real user testimonials. Fixed header navigation lets them jump to About, How It Works, Pricing, and FAQ.

When the visitor clicks “Join the Waitlist,” they’re routed to the onboarding page. Here a multi-step form collects their basic info (name, email), job preferences, and experience level. Smooth animations guide them through each step. At completion, they see a confirmation screen and an optional referral form. If they explore Pricing or FAQ instead, they land on those dedicated pages, each with back-to-top anchors and consistent header/footer.

## 4. Core Features
- **Next.js Routing & Rendering**: Hybrid SSR/SSG for page performance and SEO.
- **Responsive Layout**: Mobile-first design via Tailwind CSS utility classes.
- **Hero Section**: Attention-grabbing headline, subtext, primary CTA.
- **Problem & Solution Sections**: Visual cards and icons explaining pain points and AI solution.
- **Features Section**: List of service highlights with Lucide React icons.
- **Testimonials/Statistics**: Social proof blocks with user quotes and metrics.
- **Multi-Step Onboarding Form**: Client component using React `useState`, Framer Motion for transitions, collects user data.
- **Referral Section**: Simple form to refer friends with email inputs.
- **Pricing Plans**: Toggleable client component (`PricingClient.tsx`) displaying plan tiers.
- **FAQ Accordion**: Expand/collapse questions for common inquiries.
- **Contact Form**: Basic name/email/message fields, client-side validation.
- **SEO & Metadata**: Custom `<Head>` tags, Open Graph, JSON-LD structured data.
- **Global Layout**: `layout.tsx` wraps pages with header, animated background, and footer.

## 5. Tech Stack & Tools
- **Frontend Framework**: Next.js 13+ (App Router) with TypeScript
- **Styling**: Tailwind CSS (utility-first, custom themes)
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React (SVG icon library)
- **Utilities**: Custom `cn` function in `lib/utils.ts` for conditional class names
- **Deployment**: Vercel (leveraging serverless functions, SSR/SSG)
- **Version Control**: Git (GitHub recommended)
- **Editor/IDE**: VS Code with Tailwind CSS IntelliSense, Prettier, ESLint

## 6. Non-Functional Requirements
- **Performance**: First Contentful Paint < 1s; Lighthouse score ≥ 90
- **SEO**: Unique `title`, `description`, Open Graph tags; fast SSG/SSR pages
- **Accessibility**: WCAG 2.1 AA compliance (ARIA attributes, keyboard nav, alt text)
- **Security**: HTTPS enforcement; sanitize form inputs; no sensitive data exposure
- **Compliance**: GDPR-ready privacy policy; cookie consent if needed
- **Usability**: Mobile-first, intuitive navigation, consistent CTAs

## 7. Constraints & Assumptions
- Hosting and CDN delivered via Vercel (no custom server infrastructure)
- AI job matching API not yet available; onboarding results are mocked/stubbed
- No headless CMS—content managed in code for v1
- Developers familiar with Next.js App Router and Tailwind CSS
- Environment variables for API endpoints and analytics set in Vercel dashboard

## 8. Known Issues & Potential Pitfalls
- **Component Duplication**: Duplicate files (`pricing-client.tsx` vs `PricingClient.tsx`) may cause confusion—consolidate naming.
- **Form State Complexity**: Multi-step form logic might become hard to manage—consider React Context or a state library if it grows.
- **SEO vs. Dynamic Content**: Onboarding page is client-side only; search engines won’t index form flow (acceptable for private pages).
- **API Rate Limits**: Future AI job API calls could be rate-limited—implement caching or debounce mechanisms.
- **Accessibility Gaps**: Custom components (e.g., FAQ accordion) require ARIA roles—plan an accessibility audit.
- **Deployment Variables**: Missing or misconfigured env vars on Vercel can break form submissions—document required settings clearly.


*End of PRD*