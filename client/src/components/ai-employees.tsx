import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "1) You send a task by email or chat",
    description: "Share the work you want handled and any instructions or context.",
  },
  {
    title: "2) Your AI employee completes it",
    description: "The work is done in a computer-based environment, just like a human would.",
  },
  {
    title: "3) You receive the finished result",
    description: "Get a clear output and follow-ups if anything needs approval.",
  },
];

const plans = [
  {
    name: "20 Hours / Month",
    description: "Great for light recurring tasks and back-office support.",
  },
  {
    name: "40 Hours / Month",
    description: "Ideal for weekly workflows and shared team needs.",
  },
  {
    name: "80 Hours / Month",
    description: "Best for high-volume work or multi-department coverage.",
  },
  {
    name: "Custom",
    description: "Need more than 80 hours per month? We will create a custom quote.",
  },
];

export function AIEmployees() {
  return (
    <>
      <section id="ai-employees" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How Virtual AI Employees Work
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              If the work can be done on a computer, your AI employee can usually handle it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card key={step.title} className="p-6 md:p-8 hover-elevate transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-employee-pricing" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Virtual AI Employee Plans
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose a monthly plan based on the amount of work you want handled. Need more than 80 hours? We will build a custom quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className="p-6 md:p-8 text-center hover-elevate transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-6">
              Not sure how many hours you need? Start with 20 hours and scale up as needed.
            </p>
            <Button asChild size="lg">
              <a href="#contact">Talk to Us About AI Employees</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
