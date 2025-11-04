import { Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex-1" />
        
        <a 
          href="tel:623-632-0933" 
          className="flex items-center gap-3 text-xl md:text-2xl font-bold hover:text-primary transition-colors group"
          data-testid="header-phone"
        >
          <Phone className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-sm md:text-base font-medium text-muted-foreground">Call Now:</span>
            <span>(623) 632-0933</span>
          </div>
        </a>
        
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
