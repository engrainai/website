import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ROICalculator } from "@/components/roi-calculator";
import { Benefits } from "@/components/benefits";
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
      <Hero onGetQuote={handleGetQuote} />
      <Services />
      <ROICalculator onGetQuote={handleGetQuote} />
      <Benefits />
      <ContactSection />
      <Footer />
    </div>
  );
}
