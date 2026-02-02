import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDemoCallRequestSchema, type InsertDemoCallRequest } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowRight } from "lucide-react";
import { z } from "zod";

const demoFormSchema = insertDemoCallRequestSchema.extend({
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

export function DemoCallModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      consent: false,
    },
  });

  const demoMutation = useMutation({
    mutationFn: async (data: InsertDemoCallRequest) => {
      return await apiRequest("POST", "/api/demo-call-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Received!",
        description: "We'll call you shortly to demonstrate our AI receptionist.",
      });
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/demo-call-requests"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DemoFormData) => {
    const { consent, ...demoData } = data;
    demoMutation.mutate(demoData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="text-base md:text-lg px-8 py-6"
          data-testid="button-demo-call"
        >
          <Phone className="mr-2 w-5 h-5" />
          Request Demo Call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-demo-call">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request a Demo Call</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll call you shortly to demonstrate how our AI receptionist can transform your business.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div>
            <Label htmlFor="demo-name">Full Name</Label>
            <Input
              id="demo-name"
              {...form.register("name")}
              placeholder="John Smith"
              className="mt-2"
              data-testid="input-demo-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="demo-business-name">Business Name</Label>
            <Input
              id="demo-business-name"
              {...form.register("businessName")}
              placeholder="Your Business Name"
              className="mt-2"
              data-testid="input-demo-business-name"
            />
            {form.formState.errors.businessName && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.businessName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="demo-email">Email Address</Label>
            <Input
              id="demo-email"
              type="email"
              {...form.register("email")}
              placeholder="john@business.com"
              className="mt-2"
              data-testid="input-demo-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="demo-phone">Phone Number</Label>
            <Input
              id="demo-phone"
              type="tel"
              {...form.register("phone")}
              placeholder="(555) 123-4567"
              className="mt-2"
              data-testid="input-demo-phone"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="demo-consent"
              checked={form.watch("consent")}
              onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
              data-testid="checkbox-demo-consent"
            />
            <div className="flex-1">
              <Label 
                htmlFor="demo-consent" 
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
            disabled={demoMutation.isPending}
            data-testid="button-submit-demo"
          >
            {demoMutation.isPending ? "Submitting..." : "Request Demo Call Now"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
