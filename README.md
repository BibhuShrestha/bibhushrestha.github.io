# Bibhu Shrestha - Personal Portfolio Website

A minimal, modern, responsive, and professional personal developer portfolio website designed with a **Blue + White** color palette.

## Features

- **Live GitHub Auto-Sync:** Automatically fetches and displays any new repositories, project descriptions, stars, avatar, and bio directly from the GitHub REST API without manual code editing.
- **Clean Typography & Aesthetics:** Custom Blue (`#1d4ed8`) and White design system with subtle elevation, rounded cards, and smooth hover transitions.
- **Real Developer Information:** Built directly around Bibhu Shrestha's GitHub profile (`@BibhuShrestha`), active repository (`practice`), location (Nepal), and LinkedIn profile.
- **Section Highlights:**
  - **Navbar:** Sticky header with brand logo, smooth navigation, and a mobile hamburger menu.
  - **Hero Section:** Clear headline, professional title, concise developer bio, social/action CTA buttons, and real avatar card with focus status badge.
  - **About Me:** Grounded overview of who Bibhu is, technical interests, current learnings, and career direction.
  - **Skills:** Categorized skills (Languages, Frontend, Tools & Platforms, Core Concepts) displayed in clean badges without fake percentages.
  - **Projects:** Featured public GitHub repositories with live automatic synchronization.
  - **Education:** Degree and software engineering background.
  - **Contact:** Quick contact links, 1-click email copy button with toast feedback, and a spam-protected client-side contact form with honeypot and velocity checks.
  - **Footer:** Minimal footer with dynamic current year and quick links.
- **SEO & Performance:** Full Open Graph metadata, semantic HTML5 tags, `robots.txt`, `sitemap.xml`, and an SVG favicon. Zero heavy frameworks or runtime dependencies for lightning-fast page loads.

## File Structure

```text
profolio/
├── index.html     # Semantic HTML5 page structure and accessibility markup
├── styles.css     # Responsive Blue + White design system and media queries
├── script.js      # Minimal vanilla JS for navigation, live GitHub sync, and form
├── profile.json   # Single configuration file for updating bio, title, and LinkedIn details
├── favicon.svg    # Vector brand icon
├── robots.txt     # Search engine crawler instructions
├── sitemap.xml    # Search engine sitemap
└── README.md      # Documentation and deployment guide
```

## How to Run Locally

You can open the website directly in any browser:
1. Double-click [index.html](file:///e:/project/profolio/index.html) to open in your default browser.
2. Alternatively, if you use VS Code, right-click `index.html` and choose **"Open with Live Server"**.

## Deployment

To deploy for free with **GitHub Pages**:
1. Push this directory to a repository named `bibhushrestha.github.io` (or your preferred repo name).
2. Go to **Settings > Pages** on GitHub.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
4. Your portfolio will be live at `https://bibhushrestha.github.io/`.
