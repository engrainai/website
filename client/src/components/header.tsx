import { Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        <a 
          href="tel:623-632-0933" 
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          data-testid="header-phone"
        >
          <Phone className="w-4 h-4" />
          <span>(623) 632-0933</span>
        </a>
        
        <ThemeToggle />
      </div>
    </header>
  );
}
