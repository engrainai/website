import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { TimeBackCalculator } from "@/components/time-back-calculator";
import { FAQ } from "@/components/faq";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Services />
      <Process />
      <TimeBackCalculator onGetStarted={scrollToContact} />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}
