import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ConsultationForm } from "@/components/consultation-form";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <Hero />
      <Services />
      <Benefits />
      <ConsultationForm />
      <Footer />
    </div>
  );
}
