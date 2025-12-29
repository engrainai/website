import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ROICalculator } from "@/components/roi-calculator";
import { Pricing } from "@/components/pricing";
import { Benefits } from "@/components/benefits";
import { ContactSection } from "@/components/contact-section";
import { ContactFormModal } from "@/components/contact-form-modal";
import { Footer } from "@/components/footer";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onGetQuote={() => setContactModalOpen(true)} />
      <Services />
      <ROICalculator onGetQuote={() => setContactModalOpen(true)} />
      <Benefits />
      <Pricing onGetQuote={() => setContactModalOpen(true)} />
      <ContactSection />
      <Footer />
      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
}
