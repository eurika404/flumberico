# Flumberico Frontend Guidelines Document

This document outlines the frontend architecture, design principles, and technologies behind the Flumberico landing page. It’s written in clear, everyday language so everyone—from developers to stakeholders—can understand how the frontend is set up and why we made certain choices.

---

## 1. Frontend Architecture

### 1.1 Frameworks and Libraries
- **Next.js (v13+)**: Serves as the foundation, using the new App Router. It enables a mix of Server Components (default) and Client Components (`"use client"`) for a balance of performance and interactivity.
- **React**: Underpins all UI components, favoring composition over inheritance.
- **TypeScript**: Provides type safety across the codebase, reducing runtime errors and improving developer experience.
- **Tailwind CSS**: Utility-first styling for rapid, consistent UI development.
- **Framer Motion**: Delivers smooth, engaging animations (e.g., animated backgrounds, onboarding step transitions).
- **Lucide React**: Supplies a set of lightweight, customizable SVG icons.
- **Vercel**: The deployment platform, tightly integrated with Next.js for seamless SSR and SSG.

### 1.2 How It Supports Scalability, Maintainability, and Performance
- **Hybrid Rendering** (SSR + SSG + Client-Side Rendering): Ensures fast initial loads, great SEO, and dynamic interactions where needed.
- **Component-Based Structure**: Breaking the UI into small, reusable pieces makes adding features or fixing bugs easier and safer.
- **TypeScript**: Catches type mismatches early, reducing bugs as the app grows.
- **Tailwind CSS**: Centralizes design tokens (colors, spacing), ensuring consistent theming and easy updates.
- **File-Based Routing**: The `app/` directory and file conventions in Next.js keep routes and layouts organized by feature.
- **Automatic Code Splitting**: Next.js loads only the code needed for each page, keeping bundle sizes small.

---

## 2. Design Principles

### 2.1 Usability
- **Clear Calls-to-Action**: Buttons like “Join Waitlist” and “Refer a Friend” stand out and guide users through the journey.
- **Logical Layout**: Key sections (Hero, Problem, Solution, Features) follow a natural storytelling flow.

### 2.2 Accessibility
- **Semantic HTML**: Using proper headings, lists, and form labels to support screen readers.
- **Keyboard Navigation**: Ensuring all interactive elements (menus, accordions, forms) can be operated without a mouse.
- **Contrast and Readability**: Adhering to WCAG AA guidelines for text and background contrast.

### 2.3 Responsiveness
- **Mobile-First Approach**: All layouts and components adjust smoothly from small to large screens using Tailwind’s responsive utilities.
- **Flexible Grids and Spacing**: Consistent gutters and breakpoints ensure a balanced look on every device.

---

## 3. Styling and Theming

### 3.1 Styling Approach
- **Utility-First with Tailwind CSS**: Styles are applied using small, composable classes (e.g., `flex`, `p-4`, `text-primary`).
- **No BEM or SMACSS**: Tailwind eliminates the need for traditional CSS methodologies by providing a consistent design system.

### 3.2 Pre-processors and Frameworks
- **PostCSS**: Used under the hood by Tailwind for autoprefixing and small optimizations.

### 3.3 Theming
- **Tailwind Theme Tokens**: Defined in `tailwind.config.js` and `app/globals.css` for primary, secondary, neutral colors, and semantic shades.
- **Global CSS**: `app/globals.css` (for App Router) and `styles/globals.css` (for legacy support) import Tailwind’s base, components, and utilities.

### 3.4 Visual Style
- **Overall Style**: Modern, minimal flat design with subtle animated accents.
- **Color Palette**:
  - Primary: #4F46E5 (indigo-600)
  - Secondary: #10B981 (emerald-500)
  - Accent: #F59E0B (amber-500)
  - Neutral Light: #F3F4F6 (gray-100)
  - Neutral Dark: #1F2937 (gray-800)
  - Background: #FFFFFF
  - Text: #111827
- **Typography**:
  - Font Family: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  - Weights: 400 (regular), 500 (medium), 700 (bold)

---

## 4. Component Structure

### 4.1 Organization
- **`app/` Directory**: Holds pages (`page.tsx`), layouts (`layout.tsx`), and route segments (e.g., `app/onboarding/page.tsx`).
- **`components/` Directory**: Contains reusable UI parts grouped by function:
  - `Header` & `Footer`
  - Section components (`HeroSection`, `ProblemSection`, `FAQSection`, etc.)
  - Client-only components (`PricingClient`, `OnboardingClient`) marked with `"use client"`
- **`lib/` Directory**: Utility functions (e.g., `cn` for conditional class names).

### 4.2 Reusability and Maintainability
- **Small, Focused Components**: Each component handles one responsibility (e.g., a single section or UI control).
- **Props-Driven**: Components accept props to customize content and style, avoiding duplication.
- **Composition**: Pages compose multiple section components, making the high-level layout easy to understand and adjust.

---

## 5. State Management

### 5.1 Approach
- **Local State**: React’s `useState` hook handles most component-level state (e.g., form inputs, step index).
- **Context API or Lightweight Stores (future)**: For complex flows like onboarding, consider React Context, Zustand, or Jotai to share state across deeply nested components.

### 5.2 Data Flow
- **One-Way Data Flow**: Parent components pass down data via props; child components raise changes via callbacks.
- **Derived State**: Compute step-specific UI and data from a central state store or parent component state.

---

## 6. Routing and Navigation

### 6.1 Next.js App Router
- **File-Based Routing**: Each folder in `app/` with a `page.tsx` maps to a URL path (e.g., `app/about/page.tsx` → `/about`).
- **Layouts**: `app/layout.tsx` wraps all pages, providing shared header, footer, metadata, and animated background.

### 6.2 Navigation Structure
- **Header Links**: Top navigation points to main pages: Home, About, How It Works, Pricing, FAQ, Contact.
- **Footer Links**: Includes privacy policy, terms of service, and social media.
- **Client-Side Transitions**: Next.js’s `<Link>` component enables instant page swaps without full reloads.

---

## 7. Performance Optimization

### 7.1 Code Splitting & Lazy Loading
- **Automatic Splitting**: Next.js splits pages and components automatically, loading only what’s needed.
- **Dynamic Imports**: For heavy or rarely used components (e.g., analytics widgets), use `next/dynamic` to load them on demand.

### 7.2 Asset Optimization
- **Image Component**: Use `next/image` with defined `width`, `height`, and `alt` text for automatic resizing and formats.
- **SVG Icons**: Lucide React SVGs are tree-shaken to include only used icons.
- **Tailwind JIT**: Generates only the CSS classes in use, keeping file sizes small.

### 7.3 Rendering Strategies
- **Static Site Generation (SSG)**: For mostly static pages (e.g., About, FAQ) to achieve blazing-fast load times.
- **Server-Side Rendering (SSR)**: For pages that may need dynamic data or SEO-critical content.
- **Client-Side Rendering**: For purely interactive parts like the onboarding form.

---

## 8. Testing and Quality Assurance

### 8.1 Unit and Integration Tests
- **Jest + React Testing Library**: Write tests for critical components (Onboarding form logic, Pricing toggles) to catch regressions.
- **Mock Utilities**: Use MSW (Mock Service Worker) for API call simulations.

### 8.2 End-to-End Tests
- **Cypress**: Automate flows like “Join Waitlist” and multi-step onboarding to ensure user journeys work as expected.

### 8.3 Linting and Formatting
- **ESLint**: Enforce code style and catch common errors.
- **Prettier**: Keep formatting consistent across the project.
- **TypeScript Strict Mode**: Ensure type safety and reduce runtime surprises.

### 8.4 Accessibility Audits
- **axe-core**: Integrate automated accessibility checks in CI.
- **Manual Testing**: Verify keyboard navigation and screen reader behavior for key flows.

---

## 9. Conclusion and Overall Frontend Summary

The Flumberico frontend is built on a modern stack—Next.js, React, TypeScript, and Tailwind CSS—designed for performance, SEO, and a polished user experience. By following a component-based architecture and clear design principles (usability, accessibility, responsiveness), we ensure the code remains maintainable and scalable. Animations from Framer Motion add delight without sacrificing speed, while Vercel deployment delivers reliability and effortless updates.

Key takeaways:
- **Scalable Architecture** with hybrid rendering and file-based routing.
- **Consistent Design** through Tailwind CSS theming and a modern flat style.
- **Maintainable Code** via small, reusable components and TypeScript.
- **High Performance** from code splitting, optimized assets, and SSG/SSR.
- **Robust Quality** with planned testing strategies and accessibility best practices.

These guidelines will help the team build new features, maintain consistency, and deliver a top-notch experience for Flumberico’s users.

---

_End of Document_