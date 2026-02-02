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
<<<<<<< HEAD
      <Hero />
      <Services />
      <AIEmployees />
      <ROICalculator onGetQuote={handleGetQuote} />
      <Benefits />
      <Pricing onGetQuote={handleGetQuote} />
=======
      <Hero onGetQuote={handleGetQuote} />
      <Services />
      <ROICalculator onGetQuote={handleGetQuote} />
      <Benefits />
>>>>>>> 558b7d7b2db4ede74dd95f8d8ef08d71e63f3bc6
      <ContactSection />
      <Footer />
    </div>
  );
}
