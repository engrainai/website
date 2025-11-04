# Engrain AI - Business Automation Website

A professional business website for Engrain AI, showcasing AI automation services with voice samples, demo call booking, and consultation request features.

## Features

- **Hero Section** - Compelling introduction with clear call-to-action
- **AI Voice Samples** - Interactive showcase of different voice personalities
- **Services Overview** - Comprehensive grid of automation capabilities
- **Benefits Section** - Data-driven results and value propositions
- **Demo Booking** - Easy scheduling interface for 15-minute demos
- **Consultation Form** - Detailed form for custom automation requests
- **Responsive Design** - Beautiful UI across all devices
- **SEO Optimized** - Proper meta tags and Open Graph support

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Validation**: Zod schemas
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Build Tool**: Vite

## Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository

5. Vercel will auto-detect the configuration from `vercel.json`

6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Project Structure

```
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configs
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML entry point
├── server/                # Backend code
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory data storage
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Zod schemas and TypeScript types
├── attached_assets/       # Generated images and assets
├── vercel.json           # Vercel deployment configuration
└── package.json          # Dependencies and scripts
```

## Environment Variables

No environment variables are required for basic functionality. The application uses in-memory storage for demo purposes.

For production, you may want to:
- Add a database connection
- Configure email notifications for form submissions
- Add analytics tracking

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## API Endpoints

- `POST /api/consultation-requests` - Submit consultation request
- `GET /api/consultation-requests` - Get all consultation requests
- `POST /api/demo-bookings` - Submit demo booking
- `GET /api/demo-bookings` - Get all demo bookings

## Customization

### Colors

Edit `client/src/index.css` to customize the color scheme. The primary color is already configured for Engrain AI's brand.

### Content

- Update business information in `client/src/components/footer.tsx`
- Modify voice samples in `client/src/components/voice-samples.tsx`
- Edit services in `client/src/components/services.tsx`

## License

All rights reserved - Engrain AI

## Support

For questions or support, contact hello@engrainai.com
