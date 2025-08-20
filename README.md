# dhruva.life - Personal Website

This repository contains the source code for Dhruva Chakravarthi's personal website.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive design for various screen sizes
- Dynamic content sections:
  - Hero section with identity carousel
  - Recent wins carousel
  - Professional work experience
  - Skills and education
  - Music and art interests
  - Jiu Jitsu journey
- Interactive link previews for projects and achievements
- Smooth scrolling and animations
- Dark mode design

## Technologies Used

- [Next.js 13+](https://nextjs.org/) with App Router
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:
   \`\`\`
   git clone https://github.com/0xdhruva/dhruva-life.git
   cd dhruva-life
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

\`\`\`
dhruva-life/
├── app/
│   ├── components/
│   ├── api/
│   ├── work/
│   ├── skills/
│   ├── music/
│   ├── jiujitsu/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── lib/
├── styles/
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
\`\`\`

## Deployment

This project is set up to be easily deployed on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel, and it will automatically deploy your site with each push to the main branch.

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
