import { Sparkles } from "lucide-react";
import { useLocation } from "wouter";

const quickLinks = [
  { id: "outcomes", label: "What AI Can Do" },
  { id: "services", label: "Services" },
  { id: "process", label: "How It Works" },
  { id: "calculator", label: "Time Back Calculator" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact Us" },
];

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
              AI consulting for small businesses. We help owners understand what AI can really do,
              then put it to work to grow profits, increase productivity, and win back their time.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Automate Intelligently. Grow Effortlessly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setLocation("/privacy-policy");
                    window.scrollTo(0, 0);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-privacy-policy"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
            <a href="/n8n" className="inline-block mt-3 text-sm text-muted-foreground hover:text-foreground">n8n Google integration · Privacy &amp; Terms</a>
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
          <p>&copy; {new Date().getFullYear()} Engrain AI. All rights reserved. Helping small businesses put AI to work.</p>
        </div>
      </div>
    </footer>
  );
}
