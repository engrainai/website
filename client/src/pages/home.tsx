import { Hero } from "@/components/hero";
import { VoiceSamples } from "@/components/voice-samples";
import { Services } from "@/components/services";
import { DemoBooking } from "@/components/demo-booking";
import { ConsultationForm } from "@/components/consultation-form";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <VoiceSamples />
      <Services />
      <Benefits />
      <DemoBooking />
      <ConsultationForm />
      <Footer />
    </div>
  );
}
