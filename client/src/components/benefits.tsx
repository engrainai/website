import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, Users, Zap } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  metric: string;
  label: string;
  description: string;
}

function BenefitCard({ icon, metric, label, description }: BenefitCardProps) {
  return (
    <Card className="p-8 text-center hover-elevate transition-all duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{metric}</div>
      <div className="text-lg font-semibold mb-3">{label}</div>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

export function Benefits() {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      metric: "15+",
      label: "Hours Saved Weekly",
      description: "Offload repetitive tasks and reclaim valuable time to focus on strategic growth initiatives."
    },
    {
      icon: <Users className="w-8 h-8" />,
      metric: "95%",
      label: "Customer Satisfaction",
      description: "Deliver consistent, instant responses that delight customers and build lasting relationships."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      metric: "2.5x",
      label: "Lead Conversion",
      description: "Never miss a lead with 24/7 follow-up that nurtures prospects into customers."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      metric: "100%",
      label: "Uptime Reliability",
      description: "Our AI systems work around the clock, ensuring your business never sleeps."
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Engrain AI Advantage
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from businesses like yours that chose AI support for their teams.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.label} {...benefit} />
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Human + AI: The Perfect Partnership
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe the future isn't about replacing human service - it's about enhancing it. 
                Our AI handles the routine so your team can focus on the relationships and decisions 
                that truly matter. Experience the balance of efficiency and empathy.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
