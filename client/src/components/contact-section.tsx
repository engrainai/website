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
import { useEffect } from "react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interestedIn: z.string().min(1, "Please select an option"),
  aiEmployeePlan: z.string().optional(),
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
      email: "",
      phone: "",
      interestedIn: "",
      aiEmployeePlan: "",
      message: "",
      consent: false,
    },
  });

  const interestedIn = form.watch("interestedIn");

  useEffect(() => {
    if (interestedIn !== "Virtual AI Employees" && interestedIn !== "Both") {
      form.setValue("aiEmployeePlan", "");
    }
  }, [form, interestedIn]);

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
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to get started? Send us a message and we'll get back to you within 24 hours.
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
                <Label htmlFor="contact-interested">Interested In</Label>
                <Select
                  value={interestedIn}
                  onValueChange={(value) => form.setValue("interestedIn", value)}
                >
                  <SelectTrigger className="mt-2" id="contact-interested" data-testid="select-interested-in">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Virtual AI Employees">Virtual AI Employees</SelectItem>
                    <SelectItem value="Voice AI Receptionist">Voice AI Receptionist</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.interestedIn && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.interestedIn.message}</p>
                )}
              </div>

              {(interestedIn === "Virtual AI Employees" || interestedIn === "Both") && (
                <div>
                  <Label htmlFor="contact-ai-plan">AI Employee Plan (Optional)</Label>
                  <Select
                    value={form.watch("aiEmployeePlan")}
                    onValueChange={(value) => form.setValue("aiEmployeePlan", value)}
                  >
                    <SelectTrigger className="mt-2" id="contact-ai-plan" data-testid="select-ai-employee-plan">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20 hours/month">20 hours/month</SelectItem>
                      <SelectItem value="40 hours/month">40 hours/month</SelectItem>
                      <SelectItem value="80 hours/month">80 hours/month</SelectItem>
                      <SelectItem value="Not sure">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

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

              <div>
                <Label htmlFor="contact-message">How Can We Help?</Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Tell us what you want handled (calls, back-office tasks, or both) and we'll recommend the best plan.
                </p>
                <Textarea
                  id="contact-message"
                  {...form.register("message")}
                  placeholder="Share the tasks or calls you want handled and any details that would help us recommend a plan."
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
                {contactMutation.isPending ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quick Response</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll review your message and respond within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discovery Call</h4>
                    <p className="text-sm text-muted-foreground">
                      A brief call to understand your workflows and pain points.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Solution</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a tailored plan with clear ROI projections.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Our Commitment</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">No obligation consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">Transparent pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">Dedicated support</span>
                </div>
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
