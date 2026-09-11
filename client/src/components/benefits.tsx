import { Card } from "@/components/ui/card";
import { Check, Clock, TrendingUp, X, Zap } from "lucide-react";

const outcomes = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Grow Profits",
    description:
      "Find new revenue and cut hidden costs with faster quotes, better lead follow-up, smarter marketing, and fewer expensive mistakes.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Increase Productivity",
    description:
      "Let AI draft emails, summarize documents, organize data, and handle repetitive admin so your team gets more done in less time.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Get Your Time Back",
    description:
      "Stop spending nights and weekends on busywork. Reclaim hours every week to focus on customers, strategy, and life outside work.",
  },
];

const aiStrengths = [
  "Drafting emails, proposals, and marketing content",
  "Summarizing documents, meetings, and reports",
  "Answering common customer questions",
  "Organizing data and spotting trends",
  "Automating repetitive, rule-based tasks",
];

const aiLimits = [
  "A replacement for your judgment or customer relationships",
  "A magic fix for a broken process",
  "Something to trust blindly without a human review",
  "A one-size-fits-all software purchase",
];

export function Benefits() {
  return (
    <section id="outcomes" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What AI Can Do for Your Business
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            AI isn't just for big tech companies. Used the right way, it helps small businesses
            compete, grow, and run smoother.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {outcomes.map((outcome) => (
            <Card key={outcome.title} className="p-8 text-center hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                {outcome.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{outcome.title}</h3>
              <p className="text-muted-foreground">{outcome.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Real Talk: What AI Can and Can't Do
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                There's a lot of hype out there. We cut through it and show you where AI genuinely
                helps, and where it doesn't, so you invest your time and money wisely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">AI is great at</h4>
                <ul className="space-y-3">
                  {aiStrengths.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">AI is not</h4>
                <ul className="space-y-3">
                  {aiLimits.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
