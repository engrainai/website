import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_small_business_office_556bb140.png";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary text-sm md:text-base font-semibold tracking-wide uppercase">
            Engrain AI
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Automate Intelligently.
          <br />
          <span className="text-primary">Grow Effortlessly.</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
          Empower your local business through intelligent automation that saves time, 
          strengthens customer relationships, and drives sustainable growth — 
          bridging the gap between human service and AI precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => scrollToSection("consultation")}
            className="text-base md:text-lg px-8 py-6 bg-primary/90 backdrop-blur-sm hover:bg-primary border border-primary-border"
            data-testid="button-request-consultation"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => scrollToSection("voices")}
            className="text-base md:text-lg px-8 py-6 bg-background/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-background/20"
            data-testid="button-voice-samples"
          >
            Hear Voice Samples
          </Button>
        </div>
        
        <div className="mt-16 text-gray-300 text-sm md:text-base">
          <p className="font-medium">Trusted by 100+ local businesses nationwide</p>
        </div>
      </div>
    </section>
  );
}
