# Design Guidelines for Engrain AI Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern B2B SaaS leaders including Linear (clean modernism), Stripe (professional confidence), and Intercom (approachable technology). This approach balances technological sophistication with small business accessibility, establishing trust while showcasing AI innovation.

## Core Design Principles
1. **Professional Trust**: Design must convey reliability and expertise to small business owners
2. **Technology Clarity**: Showcase AI capabilities without overwhelming non-technical users
3. **Conversion Focus**: Clear pathways to demo calls and consultation requests
4. **Human Touch**: Balance automation messaging with warmth and approachability

## Typography System
- **Primary Font**: Inter or DM Sans (modern, professional SaaS aesthetic)
- **Secondary Font**: Same family for consistency
- **Hierarchy**:
  - Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
  - Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
  - Subheadings: text-xl md:text-2xl, font-semibold
  - Body Text: text-base md:text-lg, font-normal
  - Small Text/Labels: text-sm, font-medium

## Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 md:gap-12
- Inner content margins: mb-6, mb-8, mb-12
- Container max-width: max-w-7xl with px-6 md:px-8

## Page Structure & Sections

### 1. Hero Section (80vh minimum)
Full-width hero with professional business imagery showing small business environments or professional interactions. Include:
- Bold headline emphasizing "Automate Intelligently. Grow Effortlessly"
- Mission statement in clear, concise subheading
- Dual CTA buttons: "Try Demo Call" (primary) and "Request Consultation" (secondary)
- Trust indicator: "Trusted by 100+ local businesses" or similar social proof
- Background: Professional gradient treatment with subtle texture

### 2. Voice Samples Showcase
2-column grid (md:grid-cols-2) with interactive audio players:
- Custom audio player cards with waveform visualization or play button
- Voice type labels (Professional, Friendly, Energetic, etc.)
- Short description for each voice style
- Visual feedback on play/pause states
- Section header: "Experience Our AI Voice Receptionist"

### 3. Services Overview
3-column grid (md:grid-cols-2 lg:grid-cols-3) showcasing automation capabilities:
- AI Voice Receptionist (featured prominently)
- Lead Follow-up Automation
- Appointment Scheduling
- Client Onboarding
- Expense Categorization
- Social Media Automation
Each card includes icon, title, brief description (2-3 lines)

### 4. Demo Call Booking Section
Prominent call-to-action section with:
- Compelling headline: "See It In Action - Book Your Demo Call"
- Calendar/scheduling interface integration placeholder
- Benefits list: "No commitment", "15-minute demo", "Custom to your business"
- Visual element showing demo call interface or conversation flow

### 5. Consultation Request Form
Split layout (md:grid-cols-2):
- Left: Form with fields for business name, contact info, business type, automation needs (textarea), preferred contact method
- Right: Supporting content - "What to Expect" with timeline/process steps, contact information
- Clear submit CTA: "Request Free Consultation"

### 6. Benefits/Value Proposition
Staggered 2-column layout highlighting:
- Time savings metrics
- Customer relationship improvements
- Growth outcomes
- Human + AI collaboration message
Include compelling statistics or visual metaphors

### 7. Footer
3-column grid with:
- Company info and mission snippet
- Quick links (Services, Demo, Consultation, Contact)
- Contact details (email, phone, business hours)
- Social proof elements or certifications if applicable

## Component Library

### Buttons
- Primary: Solid fill, font-semibold, px-8 py-4, rounded-lg, text-base md:text-lg
- Secondary: Outline style with 2px border, same padding
- Blurred background when overlaying images

### Cards
- Rounded corners: rounded-xl or rounded-2xl
- Subtle shadow: shadow-lg with hover:shadow-xl transition
- Padding: p-6 md:p-8
- Border: optional subtle border (border border-gray-200 equivalent)

### Forms
- Input fields: Consistent height (h-12), rounded-lg, clear focus states
- Labels: text-sm font-medium, positioned above inputs with mb-2
- Error states: Red accent with helper text
- Spacing: space-y-6 between fields

### Audio Players
- Custom-styled with play/pause button, progress bar, duration display
- Consistent card treatment matching overall design
- Visual feedback for active playing state

## Animation Guidelines
**Minimal & Purposeful**:
- Smooth scroll-to-section on CTA clicks
- Fade-in on scroll for sections (subtle, once per session)
- Button hover states (scale or shadow changes)
- Form validation feedback
- NO: Background animations, parallax effects, or continuous motion

## Images

### Required Images:
1. **Hero Image**: Professional small business environment - modern office, local shop, or service professional interacting with customers. Should convey warmth and professionalism. Full-width background treatment.

2. **Voice Samples Section**: Waveform illustrations or abstract voice/sound wave graphics to accompany each audio player

3. **Services Icons**: Simple, modern icons for each automation service (consistent style, line-based preferred)

4. **Demo Section**: Mockup of AI voice interface or chat interaction showing professional conversation

5. **Optional Supporting Images**: Small business owners using technology, customer satisfaction visuals, growth/success imagery

### Image Placement:
- Hero: Full-width background with gradient overlay
- Services: Icon above each service card
- Demo: Side-by-side with booking interface
- Testimonials/Trust: Client logos or small headshots if available

## Responsive Behavior
- Mobile-first approach
- Single column stacking on mobile for all grids
- Navigation collapses to hamburger menu on mobile
- Form fields stack vertically on small screens
- Hero text sizes scale appropriately (5xl → 3xl on mobile)
- Maintain 16px minimum font size for readability

## Accessibility Essentials
- Semantic HTML throughout
- ARIA labels for audio controls and interactive elements
- Keyboard navigation for all forms and CTAs
- Focus indicators on all interactive elements
- Sufficient contrast ratios (WCAG AA minimum)
- Alt text for all images describing business context