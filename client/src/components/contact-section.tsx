import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { z } from "zod";

const serviceOptions = [
  "AI Strategy Workshop",
  "AI Team Training",
  "Implementation & Automation",
  "Ongoing AI Advisor",
  "Not sure yet",
];

const teamSizeOptions = ["Just me", "2-10 people", "11-50 people", "50+ people"];

const expectations = [
  {
    title: "Quick Response",
    description: "We'll review your message and reply within 24 hours to learn a bit more about your business.",
  },
  {
    title: "Clear, Up-Front Pricing",
    description: "We'll send a proposal for your AI Strategy Workshop tailored to your business, so you know exactly what you're getting before you commit.",
  },
  {
    title: "Your On-Site Workshop",
    description: "We come to your business, work hands-on with you and your team, and leave you with a clear, plain-English AI action plan.",
  },
];

const commitments = [
  "Response within 24 hours",
  "Up-front pricing before you commit",
  "Hands-on and in person, at your business",
  "Plain-English advice, no jargon",
];

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interestedIn: z.string().min(1, "Please select an option"),
  teamSize: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      interestedIn: "",
      teamSize: "",
      message: "",
      consent: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: Omit<ContactFormData, "consent">) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "Please try again or email us directly at logan@engrainai.com",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    const { consent, ...contactData } = data;
    contactMutation.mutate(contactData);
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Book Your AI Strategy Workshop
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tell us a little about your business and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Send Us a Message</h3>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input
                    id="contact-name"
                    {...form.register("name")}
                    placeholder="John Smith"
                    className="mt-2"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-business">Business Name (Optional)</Label>
                  <Input
                    id="contact-business"
                    {...form.register("businessName")}
                    placeholder="Smith Plumbing"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-phone">Phone (Optional)</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    {...form.register("phone")}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-interested">Interested In</Label>
                  <Select
                    value={form.watch("interestedIn")}
                    onValueChange={(value) => form.setValue("interestedIn", value, { shouldValidate: true })}
                  >
                    <SelectTrigger className="mt-2" id="contact-interested" data-testid="select-interested-in">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.interestedIn && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.interestedIn.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-team-size">Team Size (Optional)</Label>
                  <Select
                    value={form.watch("teamSize")}
                    onValueChange={(value) => form.setValue("teamSize", value)}
                  >
                    <SelectTrigger className="mt-2" id="contact-team-size" data-testid="select-team-size">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizeOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="contact-message">What Would You Like Help With?</Label>
                <p className="text-sm text-muted-foreground mt-2">
                  What eats up too much of your time? Where do you think AI might help? No wrong answers.
                </p>
                <Textarea
                  id="contact-message"
                  {...form.register("message")}
                  placeholder="Tell us about your business, your biggest time drains, and what you'd like to achieve with AI."
                  rows={5}
                  className="mt-2 resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="contact-consent"
                  checked={form.watch("consent")}
                  onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
                />
                <div className="flex-1">
                  <Label
                    htmlFor="contact-consent"
                    className="text-xs leading-relaxed cursor-pointer font-normal"
                  >
                    I agree to receive calls, text messages, and emails from Engrain AI, including messages sent using automated or AI-powered systems, at the contact information I provided. I understand that consent is not a condition of purchase, and I can opt out at any time by replying STOP to texts or using the unsubscribe link in emails. Message and data rates may apply. See our Privacy Policy for details.
                  </Label>
                  {form.formState.errors.consent && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.consent.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Request My AI Strategy Workshop"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
              <div className="space-y-6">
                {expectations.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Our Commitment</h4>
              <div className="space-y-3">
                {commitments.map((commitment) => (
                  <div key={commitment} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{commitment}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h4 className="font-semibold mb-2">Contact Us Directly</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer to reach out another way?
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> logan@engrainai.com</p>
                <p><span className="font-medium">Phone:</span> (623) 632-0933</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
