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
import { insertConsultationRequestSchema, type InsertConsultationRequest } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { z } from "zod";

type ConsultationFormData = InsertConsultationRequest & { consent: boolean };

export function ConsultationForm() {
  const { toast } = useToast();
  const consultationSchema = insertConsultationRequestSchema.extend({
    businessName: insertConsultationRequestSchema.shape.businessName,
    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to receive communications",
    }),
  });

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      automationNeeds: "",
      preferredContactMethod: "",
      consent: false,
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: InsertConsultationRequest) => {
      return await apiRequest("POST", "/api/consultation-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll review your needs and contact you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/consultation-requests"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ConsultationFormData) => {
    const { consent, ...consultationData } = data;
    consultationMutation.mutate(consultationData);
  };

  return (
    <section id="consultation" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Request a Free Consultation
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how AI automation can transform your business. Share your challenges and goals, 
            and we'll create a custom solution tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Tell Us About Your Business</h3>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  {...form.register("businessName")}
                  placeholder="Your Business Name"
                  className="mt-2"
                  data-testid="input-business-name"
                />
                {form.formState.errors.businessName && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.businessName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contact-name">Your Name</Label>
                <Input
                  id="contact-name"
                  {...form.register("contactName")}
                  placeholder="John Smith"
                  className="mt-2"
                  data-testid="input-contact-name"
                />
                {form.formState.errors.contactName && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.contactName.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="consultation-email">Email</Label>
                  <Input
                    id="consultation-email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@business.com"
                    className="mt-2"
                    data-testid="input-consultation-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="consultation-phone">Phone</Label>
                  <Input
                    id="consultation-phone"
                    type="tel"
                    {...form.register("phone")}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                    data-testid="input-consultation-phone"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="business-type">Business Type</Label>
                <Select
                  value={form.watch("businessType")}
                  onValueChange={(value) => form.setValue("businessType", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-business-type">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Home Services">Home Services</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.businessType && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.businessType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="automation-needs">Automation Needs</Label>
                <Textarea
                  id="automation-needs"
                  {...form.register("automationNeeds")}
                  placeholder="Describe your current challenges and what you'd like to automate..."
                  rows={4}
                  className="mt-2 resize-none"
                  data-testid="textarea-automation-needs"
                />
                {form.formState.errors.automationNeeds && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.automationNeeds.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contact-method">Preferred Contact Method</Label>
                <Select
                  value={form.watch("preferredContactMethod")}
                  onValueChange={(value) => form.setValue("preferredContactMethod", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-contact-method">
                    <SelectValue placeholder="How should we reach you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Either">Either</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.preferredContactMethod && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.preferredContactMethod.message}</p>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="consultation-consent"
                  checked={form.watch("consent")}
                  onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
                  data-testid="checkbox-consultation-consent"
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="consultation-consent" 
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
                disabled={consultationMutation.isPending}
                data-testid="button-submit-consultation"
              >
                {consultationMutation.isPending ? "Submitting..." : "Request Free Consultation"}
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
                    <h4 className="font-semibold mb-1">Initial Review</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll carefully review your business needs and automation goals.
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
                      A 30-minute conversation to understand your workflows and pain points.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Proposal</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a tailored automation plan with clear ROI projections.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Implementation</h4>
                    <p className="text-sm text-muted-foreground">
                      We handle setup, training, and ongoing support to ensure success.
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
                  <span className="text-sm">Transparent pricing and timelines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">Dedicated support team</span>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h4 className="font-semibold mb-2">Contact Us Directly</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer to reach out another way? We're here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> logan@engrainai.com</p>
                <p><span className="font-medium">Phone:</span> (623) 632-0933</p>
                <p><span className="font-medium">Hours:</span> Mon-Fri, 9am-6pm EST</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
