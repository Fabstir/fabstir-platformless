# Platformless AI Landing Page

A modern, fully-featured landing page for Platformless AI built with Next.js 15.5.5, React 19, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15.5.5** with App Router and Turbopack for blazing-fast development
- **React 19** with latest performance improvements
- **TypeScript** for type safety
- **Tailwind CSS** with custom Fabstir brand colors
- **shadcn/ui** components with React 19 support
- **Dark mode** by default with modern Web3 aesthetic
- **Fully responsive** design (mobile, tablet, desktop)
- **Interactive FAQ** with search functionality
- **Waitlist modal** with form validation
- **Smooth animations** and hover effects
- **SEO optimized** with metadata

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router, Turbopack)
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: shadcn/ui (Button, Card, Accordion, Input, Dialog, Badge, Label)
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate

## Project Structure

```
fabstir-platformless/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main landing page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── Header.tsx            # Sticky header with navigation
│   ├── Hero.tsx              # Hero section with gradient text
│   ├── ValueProposition.tsx  # Comparison section
│   ├── FAQ.tsx               # Interactive FAQ with search
│   ├── Architecture.tsx      # Architecture diagram section
│   ├── Footer.tsx            # Footer with social links
│   └── WaitlistModal.tsx     # Waitlist form modal
├── lib/
│   ├── utils.ts              # Utility functions (cn)
│   └── faq-data.ts           # All 15 FAQ questions and answers
├── public/
│   └── [logo files]          # Fabstir logos and favicons
├── docs/
│   ├── PLATFORMLESS_AI_LANDING_PAGE_DESIGN.md
│   └── fabstir_color_profile_1.json
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind with Fabstir colors
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes. Turbopack provides near-instant updates.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Start Production Server

```bash
npm start
```

Runs the production build locally.

## Color Scheme

The design uses Fabstir brand colors from `docs/fabstir_color_profile_1.json`:

### Primary Colors
- **Primary Purple**: `#540074` - Main brand color, CTAs, buttons
- **Primary Light**: `#9d50bc` - Hover states, secondary elements
- **Primary Dark**: `#260048` - Dark backgrounds, panels
- **Primary Content**: `#ea97ff` - Text on dark purple backgrounds

### Secondary Colors (Pink Accents)
- **Secondary Pink**: `#e458b9` - Highlights, badges
- **Secondary Light**: `#ffa5ff` - Hover states, accents
- **Secondary Dark**: `#af1e89` - Strong accents, active states

### Utility Colors
- **Success Green**: `#48a437` - Checkmarks (✓)
- **Error Red**: `#a93a2a` - X marks (✗) in comparison
- **Warning Yellow**: `#a6a23a` - Warning states

### Dark Mode Neutrals
- **Background**: `#1a1a1d` - Main background
- **Foreground**: `#e6e6e9` - Primary text
- **Border**: `#3e3e40` - Borders, dividers
- **Copy**: `#ababae` - Body text
- **Copy Light**: `#c5c5c8` - Lighter text
- **Copy Lighter**: `#e1e1e4` - Very light text

## Interactive Features

### FAQ Search
- Real-time search filtering across all FAQ questions and answers
- Three-column layout (General, Users, Hosting)
- Click any question to display detailed answer below
- Smooth scrolling to answer section

### Waitlist Modal
- Opens when "Join Waitlist" button is clicked
- Form fields: Name, Email, Interest (User/Developer/GPU Provider)
- Form validation and submission handling
- Success message with animation

### Hover Effects
- Buttons scale and change color on hover
- Cards shift border colors (neutral → purple/pink)
- FAQ questions slide slightly on hover
- Social icons scale on hover

### Animations
- Gradient text effect on "Platformless AI" heading
- Pulsing background gradients in hero section
- Fade-in animations for FAQ answers
- Scale and shadow effects on interactive elements

## Sections

1. **Header**: Sticky navigation with logo and links (GitHub, Docs)
2. **Hero**: Large gradient heading, tagline, and CTA button
3. **Value Proposition**: Two-column comparison (Traditional vs Platformless)
4. **FAQ**: Searchable three-column layout with 15 questions
5. **Architecture**: Visual explanation of how the system works
6. **Footer**: Social links and attribution

## FAQ Content

All 15 FAQ questions are included with comprehensive answers:

### General (5 questions)
1. What is Platformless AI?
2. Why "platformless"?
3. How does it work?
4. Is my data private?
5. What makes this different from OpenAI/Anthropic?

### Users (5 questions)
1. How do I start using Platformless AI?
2. What AI models are available?
3. Is this cheaper than OpenAI/Anthropic?
4. Do I need crypto/wallet to use this?
5. What if I need help or have issues?

### Hosting (5 questions)
1. How do I become a GPU provider?
2. What hardware do I need?
3. How do I get paid for hosting models?
4. What are the staking requirements?
5. How are payments settled?

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project to Vercel
3. Vercel will auto-detect Next.js and configure build settings
4. Deploy!

The site will be live at `your-project.vercel.app`

### Environment Variables

No environment variables needed for the landing page. If you add a waitlist backend API, create `.env.local`:

```env
NEXT_PUBLIC_WAITLIST_API_URL=your-api-url
```

## Performance

- **Turbopack**: Near-instant development builds
- **React 19**: Improved rendering and performance
- **Next.js 15**: Enhanced caching and optimization
- **Tailwind CSS**: Minimal CSS bundle size
- **Image Optimization**: Next.js automatic image optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a Fabstir project. For contributions, please contact the Fabstir team.

## Links

- **GitHub**: https://github.com/fabstir-llm-marketplace
- **Fabstir**: https://fabstir.com
- **Discord**: https://discord.gg/fabstir (coming soon)

## License

Copyright © 2025 Fabstir. All rights reserved.

---

Built with ❤️ by Fabstir • Powered by Base L2 • Secured by STARK proofs
