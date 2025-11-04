import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { ConsultationForm } from "@/components/consultation-form";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Benefits />
      <Pricing />
      <ConsultationForm />
      <Footer />
    </div>
  );
}
