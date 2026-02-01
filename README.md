# Personal Portfolio Website

A modern, cybersecurity-themed personal portfolio website built with Next.js. Features a dark theme with glitch effects, hacker-style animations, and a futuristic aesthetic perfect for showcasing cybersecurity projects and expertise.

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

## License
Copyright © 2026 Jessy Chahal. All Rights Reserved.

This code is proprietary and not open source. It may not be used, copied, or modified without prior written permission.
