import { Sparkles } from "lucide-react";
import { DemoCallModal } from "@/components/demo-call-modal";
import heroImage from "@assets/generated_images/Small_business_with_automation_glow_f8e11d38.png";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-primary" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white">
            Engrain AI
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Automate Intelligently. Grow Effortlessly.
        </h2>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
          Empower your local business through intelligent automation that saves time, 
          strengthens customer relationships, and drives sustainable growth — 
          bridging the gap between human service and AI precision.
        </p>
        
        <DemoCallModal />
      </div>
    </section>
  );
}
