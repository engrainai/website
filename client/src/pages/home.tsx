import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { AIEmployees } from "@/components/ai-employees";
import { ROICalculator } from "@/components/roi-calculator";
import { Benefits } from "@/components/benefits";
import { Pricing } from "@/components/pricing";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const handleGetQuote = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <AIEmployees />
      <ROICalculator onGetQuote={handleGetQuote} />
      <Benefits />
      <Pricing onGetQuote={handleGetQuote} />
      <ContactSection />
      <Footer />
    </div>
  );
}
