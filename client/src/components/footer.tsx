import { Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export function Footer() {
  const [, setLocation] = useLocation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Engrain AI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Empowering local businesses through intelligent automation that saves time, 
              strengthens customer relationships, and drives sustainable growth.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Automate Intelligently. Grow Effortlessly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-services"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-pricing"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("calculator")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-calculator"
                >
                  ROI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-contact"
                >
                  Contact Us
                </button>
              </li>
              <li>
               <button
                  onClick={() => {
                    setLocation("/privacy-policy");
                    window.scrollTo(0, 0);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-contact"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:logan@engrainai.com" className="text-muted-foreground hover:text-primary transition-colors">
                  logan@engrainai.com
                </a>
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:623-632-0933" className="text-muted-foreground hover:text-primary transition-colors">
                  (623) 632-0933
                </a>
              </li>
              <li>
                <span className="font-medium">Business Hours:</span>{" "}
                <span className="text-muted-foreground">Mon-Fri, 9am-6pm MST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Engrain AI. All rights reserved. Bridging human service and AI precision.</p>
        </div>
      </div>
    </footer>
  );
}
