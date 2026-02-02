import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Services() {
  return (
    <section id="products" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Products
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pick one or use both together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-8 flex flex-col gap-6 hover-elevate transition-all duration-300">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Virtual AI Employees</h3>
              <p className="text-muted-foreground">
                Send tasks by email or chat. Your AI employee completes the work on its own computer-based environment and returns the results.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Send requests via email or instant messenger</li>
              <li>Handles tasks that can be done on a computer (like a human would)</li>
              <li>Plans available in 20, 40, or 80 hours per month (custom if you need more)</li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="default">
                <a href="#ai-employee-pricing">View AI Employee Plans</a>
              </Button>
            </div>
          </Card>

          <Card className="p-8 flex flex-col gap-6 hover-elevate transition-all duration-300">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Voice AI Receptionist (24/7/365)</h3>
              <p className="text-muted-foreground">
                Never miss a call. Our AI receptionist answers around the clock, routes calls, takes messages, and captures leads.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>24/7/365 call answering</li>
              <li>Call routing and message taking</li>
              <li>Email summaries and lead capture</li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="outline">
                <a href="#voice-pricing">View Receptionist Pricing</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
