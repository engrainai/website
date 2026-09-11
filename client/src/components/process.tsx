import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Discover",
    description:
      "An in-person AI Strategy Workshop at your business to understand your goals, your challenges, and where time and money are slipping away.",
  },
  {
    title: "Learn",
    description:
      "We show you what AI can realistically do for your business, using examples from your own day-to-day work.",
  },
  {
    title: "Implement",
    description:
      "We put the highest-impact ideas into action and train your team to use them with confidence.",
  },
  {
    title: "Grow",
    description:
      "We measure the results, refine what's working, and keep finding new opportunities as you grow.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple path from "Where do I even start?" to real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={step.title} className="p-6 md:p-8 hover-elevate transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
