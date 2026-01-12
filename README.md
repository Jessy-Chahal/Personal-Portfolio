# Personal Portfolio Website

A modern, cybersecurity-themed personal portfolio website built with Next.js. Features a dark theme with glitch effects, hacker-style animations, and a futuristic aesthetic perfect for showcasing cybersecurity projects and expertise.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Interactive Loading Screen**: Cybersecurity-themed loading screen with glitch effects, scanlines, noise texture, and security protocol indicators. Requires holding for 5 seconds to enter.
- **About Section**: Personal introduction with glitch text effects and cybersecurity focus
- **Experience Section**: Professional experience timeline with animated reveals
- **Projects Portfolio**: Showcase of cybersecurity and development projects with detailed descriptions
- **Blog Section**: Cybersecurity-focused blog posts with detailed technical content
- **Contact Form**: Functional contact form with mailto integration
- **Smooth Navigation**: Fixed navigation bar with smooth scrolling to sections
- **Responsive Design**: Fully responsive across all devices
- **Modern Animations**: Glitch effects, text shuffling, smooth transitions, and hover effects throughout

## Project Structure

```
Personal-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── template.tsx        # Template for loading screen control
│   ├── globals.css         # Global styles
│   └── blog/
│       ├── [slug]/         # Dynamic blog post routes
│       └── posts/          # Blog post content files
├── components/
│   ├── Navigation.tsx       # Navigation bar component
│   ├── Navigation.module.css
│   ├── LoadingScreen.tsx   # Interactive loading screen
│   ├── LoadingScreen.module.css
│   ├── Logo.tsx            # Logo component with hover effects
│   ├── Logo.module.css
│   ├── GlitchText.tsx      # Glitch text effect component
│   ├── GlitchText.module.css
│   ├── ShuffledText.tsx    # Text shuffling animation component
│   ├── ShuffledText.module.css
│   ├── ShuffledHeading.tsx # Shuffled heading component
│   ├── ShuffledHeading.module.css
│   └── sections/
│       ├── About.tsx       # About section
│       ├── About.module.css
│       ├── Experience.tsx  # Experience section
│       ├── Experience.module.css
│       ├── Projects.tsx    # Projects showcase
│       ├── Projects.module.css
│       ├── Blog.tsx        # Blog listing section
│       ├── Blog.module.css
│       ├── Contact.tsx     # Contact section
│       └── Contact.module.css
├── public/
│   └── assets/
│       └── static.gif      # Background animation
└── package.json
```

## Design Features

- **Color Scheme**: Dark background (#0a0a0a) with white and cyan accents
- **Typography**: Monospace fonts (Courier New) for a tech/hacker aesthetic, mixed with modern sans-serif fonts
- **Effects**: 
  - Glitch animations with black and white effects
  - Scanlines overlay for CRT monitor effect
  - Noise texture for retro feel
  - Screen flicker and random glitch flashes
  - Text shuffling animations
  - Smooth transitions and hover effects
- **Layout**: Clean, modern single-page layout with smooth scrolling sections

## Customization

### Update Personal Information

1. **About Section**: Edit `components/sections/About.tsx` to update personal information
2. **Experience**: Update experience entries in `components/sections/Experience.tsx`
3. **Projects**: Modify the projects array in `components/sections/Projects.tsx`
4. **Blog Posts**: Add or edit blog posts in `app/blog/posts/` directory
5. **Contact**: Change contact information in `components/sections/Contact.tsx`

### Loading Screen

The loading screen features:
- Interactive hold-to-enter mechanism (5 seconds)
- Security protocol status indicators that change based on progress
- Glitch effects, scanlines, and noise texture
- Animated rectangle border showing progress

Customize the hold duration in `components/LoadingScreen.tsx`:
```tsx
const HOLD_DURATION = 5000 // Change duration in milliseconds
```

### Colors

The color scheme can be customized by updating CSS variables in the component stylesheets. Main colors:
- Background: `#0a0a0a`
- Text: `#e0e0e0` / `#ffffff`
- Accents: Cyan and white glows

## Blog Posts

Blog posts are stored as TypeScript files in `app/blog/posts/` and dynamically rendered. Each post includes:
- Title, date, read time
- Detailed content with markdown-style formatting
- Tables, code blocks, and blockquotes
- Automatic chronological sorting

## Deployment

Deploy easily to Vercel:

```bash
npm run build
```

Then deploy to [Vercel](https://vercel.com) or your preferred hosting platform.

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Modules
- Modern CSS (Grid, Flexbox, Animations, Keyframes)
- Intersection Observer API for scroll animations

## License
Copyright © 2026 Jessy Chahal. All Rights Reserved.
This code is proprietary and not open source. It may not be used, copied, or modified without prior written permission.