import { Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#calculator", label: "Calculator" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold" data-testid="header-logo">
          <Sparkles className="w-6 h-6 text-primary" />
          Engrain AI
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="tel:623-632-0933"
            className="flex items-center gap-2 font-semibold hover:text-primary transition-colors"
            aria-label="Call (623) 632-0933"
            data-testid="header-phone"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">(623) 632-0933</span>
          </a>
          <Button asChild size="sm" className="hidden md:inline-flex" data-testid="header-cta">
            <a href="#contact">Free Strategy Call</a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
