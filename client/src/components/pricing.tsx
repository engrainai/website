<<<<<<< HEAD
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingProps {
  onGetQuote?: () => void;
}

export function Pricing({ onGetQuote }: PricingProps) {
  const plans = [
    {
      name: "Basic",
      price: "$250",
      period: "/mo",
      description: "Perfect for solo operators",
      features: [
        "AI receptionist",
        "Basic call routing",
        "Email summaries",
        "Business hours support",
      ],
    },
    {
      name: "Advanced",
      price: "$500",
      period: "/mo",
      description: "For growing teams",
      isPopular: true,
      features: [
        "Multi-number routing",
        "CRM integration",
        "Lead capture and next-step notifications",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Let's talk",
      period: "",
      description: "Tailored call handling and routing",
      features: [
        "Custom call flows",
        "Dedicated account manager",
        "Advanced analytics",
        "24/7 priority support",
      ],
    },
  ];

  return (
    <section id="voice-receptionist" className="py-16 md:py-24 lg:py-32 bg-background">
      <div id="voice-pricing" className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Voice AI Receptionist Pricing
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Clear pricing for your 24/7 AI receptionist
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Answer calls 24/7/365 and capture more leads - choose the plan that fits your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="relative p-8 hover-elevate"
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Starting At</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.isPopular ? "default" : "outline"}
                onClick={onGetQuote}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include onboarding, training, and ongoing support.
          </p>
        </div>
      </div>
    </section>
  );
}
=======
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingProps {
  onGetQuote?: () => void;
}

export function Pricing({ onGetQuote }: PricingProps) {
  const plans = [
    {
      name: "Basic",
      price: "$250",
      period: "/mo",
      description: "Perfect for solo operators",
      features: [
        "AI receptionist",
        "Basic call routing",
        "Email summaries",
        "Business hours support",
      ],
    },
    {
      name: "Advanced",
      price: "$500",
      period: "/mo",
      description: "For growing teams",
      isPopular: true,
      features: [
        "Multi-number routing",
        "CRM integration",
        "Lead follow-up automation",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Let's talk",
      period: "",
      description: "Tailored automations",
      features: [
        "Custom workflows",
        "Dedicated account manager",
        "Advanced analytics",
        "24/7 priority support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Right-Sized Plans
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Clear pricing for small businesses
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with a pilot, then expand as value compounds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="relative p-8 hover-elevate"
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Starting At</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.isPopular ? "default" : "outline"}
                onClick={onGetQuote}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include training and ongoing support.
          </p>
        </div>
      </div>
    </section>
  );
}
>>>>>>> 558b7d7b2db4ede74dd95f8d8ef08d71e63f3bc6
