import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  Receipt, 
  Share2 
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 border-card-border" data-testid={`card-service-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function Services() {
  const services = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "AI Voice Receptionist",
      description: "Never miss a call again. Our AI receptionist handles customer inquiries 24/7 with natural, professional conversations."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Lead Follow-up Automation",
      description: "Automatically nurture leads with personalized follow-ups, ensuring no opportunity slips through the cracks."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Scheduling",
      description: "Smart scheduling that syncs with your calendar, sends reminders, and reduces no-shows automatically."
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Client Onboarding",
      description: "Streamline new client intake with automated workflows that collect information and set expectations."
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Expense Categorization",
      description: "Intelligent expense tracking that automatically categorizes transactions and prepares reports for accounting."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Automation",
      description: "Maintain consistent social presence with AI-powered content creation and scheduling across platforms."
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Comprehensive Business Automation
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From customer service to operations, we automate the tasks that consume your time so you can focus on growing your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
