# Engrain AI Website

## Overview
Professional business website for Engrain AI - an AI automation company focused on helping small businesses automate intelligently and grow effortlessly.

**Live Date**: November 4, 2025
**Status**: Production Ready

## Business Information
- **Company**: Engrain AI
- **Tagline**: Automate Intelligently. Grow Effortlessly.
- **Primary Service**: AI Voice Receptionist
- **Target Market**: Small business owners
- **Contact Email**: logan@engrainai.com
- **Contact Phone**: (623) 632-0933
- **Pricing**: 
  - Basic: $250/month
  - Advanced: $500/month
  - Enterprise: Custom pricing for larger requirements
- **Mission**: To empower local businesses through intelligent automation that saves time, strengthens customer relationships, and drives sustainable growth — bridging the gap between human service and AI precision.

## Features Implemented

### 1. Dark Mode Theme
- Application defaults to dark mode for modern, professional appearance
- Theme toggle button in top-right corner
- Smooth transitions between light and dark modes
- Theme preference persisted in localStorage
- Fully responsive dark mode design across all components

### 2. Hero Section
- Full-width hero with professional small business imagery
- Compelling headline and tagline
- Dual CTA buttons (Get Started, Hear Voice Samples)
- Trust indicator
- Gradient overlay for text readability

### 3. Voice Samples Showcase
- Interactive voice sample cards
- 4 different voice personalities (Professional, Friendly, Energetic, Calm)
- Visual waveform display
- Play/pause functionality (simulated)

### 4. Services Grid
- 6 automation services displayed
- Icons from lucide-react
- Hover effects optimized for dark mode
- Services include:
  - AI Voice Receptionist
  - Lead Follow-up Automation
  - Appointment Scheduling
  - Client Onboarding
  - Expense Categorization
  - Social Media Automation

### 5. Benefits Section
- 4 metric cards showing value proposition
- "Human + AI Partnership" messaging card
- Statistics on time saved, customer satisfaction, lead conversion, uptime
- Dark mode optimized design

### 6. Consultation Request Form
- Comprehensive form for custom automation needs
- Required fields: business name, contact name, email, phone, business type, automation needs, preferred contact method
- "What to Expect" process breakdown with numbered steps
- Direct contact information displayed
- Backend integration with validation
- Success/error toast notifications

### 7. Footer
- Company branding
- Quick navigation links
- Contact information
- Copyright notice
- Dark mode compatible styling

## Technical Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn UI component library
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query v5
- **Routing**: Wouter (lightweight React router)
- **Font**: Inter (Google Fonts)

### Backend
- **Server**: Express.js
- **Storage**: In-memory (MemStorage class)
- **Validation**: Zod schemas
- **API Endpoints**:
  - POST /api/consultation-requests
  - GET /api/consultation-requests
  - POST /api/demo-bookings
  - GET /api/demo-bookings

### Data Models
- **ConsultationRequest**: Business name, contact name, email, phone, business type, automation needs, preferred contact method
- **DemoCallRequest**: Name, business name, email, phone (for immediate callback requests)
- **VoiceSample**: Name, description, voice type (client-side only)

## Design System

### Colors
- **Primary**: Blue (#3b82f6 - HSL 217 91% 60%) - represents trust and technology
- **Background**: Clean white/dark mode support
- **Text**: Three levels of hierarchy (default, secondary, tertiary)

### Typography
- **Font Family**: Inter (sans-serif)
- **Scales**: Responsive type scale from mobile to desktop
- **Hierarchy**: Clear distinction between headings, subheadings, body text

### Spacing
- Consistent spacing units (4, 6, 8, 12, 16, 20, 24)
- Section padding: py-16 md:py-24 lg:py-32
- Component gaps: gap-6, gap-8, gap-12

### Components
- All components use Shadcn primitives
- Hover elevate effects for interactive elements
- Consistent border radius (rounded-lg for cards)
- Subtle shadows for depth

## Deployment Configuration

### Vercel Ready
- `vercel.json` configured for seamless deployment
- Proper rewrites for SPA routing
- API routes configured
- Build command: `npm run build`

### GitHub Ready
- `.gitignore` configured
- `README.md` with deployment instructions
- Clean project structure

## Recent Changes
- **Nov 4, 2025 (Update 5)**: Final Vercel serverless fix - catch-all route pattern
  - **CRITICAL FIX**: Implemented Vercel catch-all route pattern to properly handle all /api/* requests
  - Renamed `api/index.ts` to `api/[...path].ts` - Vercel's catch-all route automatically handles all API paths
  - Removed problematic dual-path registration that would have caused duplicate webhooks
  - Added comprehensive production debugging logs to serverless handler and routes
  - Updated `vercel.json` to reference catch-all route and removed unnecessary rewrites
  - **Architecture**: Catch-all route preserves full request path, Express routes registered once as /api/*
  - All tests passing - single 201 responses confirmed, no duplicates
  - Ready for Vercel deployment with proper error logging

- **Nov 4, 2025 (Update 4)**: Vercel serverless architecture implementation
  - Created `server/app.ts` - Reusable Express app factory for dev and production
  - Refactored `server/index.ts` to use createApp() for development
  - Updated `server/routes.ts` to only register routes (no HTTP server creation)
  - Enhanced DEPLOYMENT.md with serverless architecture overview

- **Nov 4, 2025 (Update 3)**: Webhook debugging and deployment fixes
  - Enhanced webhook logging with [Webhook] prefix for better debugging
  - Added comprehensive DEPLOYMENT.md with Vercel setup instructions
  - Updated README.md with webhook environment variable requirements
  - Added detailed webhook payload format documentation
  - Improved error handling and logging for webhook integration
  - Updated hero image to show open business with people and automation glow

- **Nov 4, 2025 (Update 2)**: Dark mode and UX improvements
  - Implemented dark mode with theme toggle
  - Removed demo booking section per user request
  - Simplified demo flow (removed date/time scheduling)
  - Made business name required in consultation form
  - Updated hero CTAs to "Get Started" and "Hear Voice Samples"
  - All components optimized for dark mode display

- **Nov 4, 2025 (Update 1)**: Initial implementation completed
  - All schemas defined
  - Complete frontend built with exceptional visual quality
  - Backend API endpoints implemented
  - Forms connected to backend
  - Vercel configuration added

## User Preferences
- Professional, modern B2B SaaS aesthetic
- Small business owner target audience
- Clean, trustworthy design
- No dark patterns or aggressive sales tactics
- Focus on automation benefits and human+AI partnership

## Project Structure
```
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Shadcn UI primitives
│   │   │   ├── hero.tsx
│   │   │   ├── voice-samples.tsx
│   │   │   ├── services.tsx
│   │   │   ├── benefits.tsx
│   │   │   ├── demo-booking.tsx
│   │   │   ├── consultation-form.tsx
│   │   │   └── footer.tsx
│   │   ├── pages/
│   │   │   ├── home.tsx     # Main landing page
│   │   │   └── not-found.tsx
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Root component
│   │   └── index.css        # Global styles
│   └── index.html           # HTML entry point
├── server/                   # Backend Express server
│   ├── routes.ts            # API route handlers
│   ├── storage.ts           # In-memory data storage
│   └── index.ts             # Server entry point
├── shared/
│   └── schema.ts            # Shared Zod schemas and types
├── attached_assets/         # Generated images
│   └── generated_images/    # AI-generated hero and mockup images
├── design_guidelines.md     # Design system documentation
├── vercel.json              # Vercel deployment config
├── README.md                # Deployment documentation
└── package.json             # Dependencies
```

## Next Steps (Future Enhancements)
- Add real audio files for voice samples
- Integrate calendar API for demo scheduling
- Add email notifications for form submissions
- Implement database persistence (PostgreSQL)
- Add testimonials section
- Create case studies page
- Add FAQ section
- Implement contact form email automation
- Add analytics tracking
- Custom domain configuration

## Notes
- All forms use proper validation with Zod schemas
- All interactive elements have data-testid attributes for testing
- Responsive design works across all breakpoints
- SEO optimized with proper meta tags
- Accessibility considerations implemented
- Loading and error states handled gracefully
