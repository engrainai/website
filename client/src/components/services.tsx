import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, GraduationCap, Handshake, Presentation, Workflow, type LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
}

const services: Service[] = [
  {
    icon: Presentation,
    title: "AI Strategy Workshop",
    description:
      "An in-person, hands-on workshop at your business. We learn how you work, show you what AI can really do, and pinpoint where it can save time and make money.",
    highlights: [
      "On-site with you and your team",
      "Top AI opportunities ranked by impact",
      "Plain-English action plan you can put to work",
    ],
  },
  {
    icon: GraduationCap,
    title: "AI Team Training",
    description:
      "Hands-on training for you and your team on using AI tools like ChatGPT, Claude, and Copilot safely and effectively in day-to-day work.",
    highlights: [
      "Tailored to your industry and roles",
      "Practical, hands-on sessions",
      "Guidelines for safe, responsible use",
    ],
  },
  {
    icon: Workflow,
    title: "Implementation & Automation",
    description:
      "We set up and connect the right AI tools and automations for your business, so the plan turns into real results.",
    highlights: [
      "Tool selection and setup",
      "Workflow automation",
      "Works with the software you already use",
    ],
  },
  {
    icon: Handshake,
    title: "Ongoing AI Advisor",
    description:
      "AI changes fast. We stay in your corner with regular check-ins, fresh ideas, and support as your business grows.",
    highlights: [
      "Regular strategy check-ins",
      "Updates on new tools that matter to you",
      "Support when you need it",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How We Help
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From your first question about AI to a business that runs smarter every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, description, highlights }) => (
            <Card key={title} className="p-8 flex flex-col gap-6 hover-elevate transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <ul className="space-y-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Not sure where to start? Start with an AI Strategy Workshop.
          </p>
          <Button asChild size="lg">
            <a href="#contact">Book an AI Strategy Workshop</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
