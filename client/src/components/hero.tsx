import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Open_business_with_people_and_automation_45e01c53.png";

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

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Two products you can buy together or separately: Virtual AI Employees and a 24/7/365 Voice AI Receptionist.
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
          Virtual AI Employees handle computer-based tasks you send by email or chat. Our Voice AI Receptionist answers calls 24/7/365.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="default"
            asChild
            data-testid="button-virtual-ai-employees"
          >
            <a href="#ai-employees">Virtual AI Employees</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            asChild
            data-testid="button-voice-receptionist"
          >
            <a href="#voice-receptionist">Voice AI Receptionist</a>
          </Button>
        </div>

        <p className="text-white/80 mt-6 text-base md:text-lg">
          Not sure which one you need?{" "}
          <a href="#contact" className="underline underline-offset-4 hover:text-white">
            Contact us
          </a>{" "}
          and we'll recommend the best fit.
        </p>
      </div>
    </section>
  );
}
