<<<<<<< HEAD
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
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

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormModal({ open, onOpenChange }: ContactFormModalProps) {
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
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Talk to Us</DialogTitle>
          <DialogDescription>
            Tell us what you want handled, and we'll recommend the best plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div>
            <Label htmlFor="modal-name">Full Name</Label>
            <Input
              id="modal-name"
              {...form.register("name")}
              placeholder="John Smith"
              className="mt-2"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="modal-interested">Interested In</Label>
            <Select
              value={interestedIn}
              onValueChange={(value) => form.setValue("interestedIn", value)}
            >
              <SelectTrigger className="mt-2" id="modal-interested" data-testid="select-interested-in">
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
              <Label htmlFor="modal-ai-plan">AI Employee Plan (Optional)</Label>
              <Select
                value={form.watch("aiEmployeePlan")}
                onValueChange={(value) => form.setValue("aiEmployeePlan", value)}
              >
                <SelectTrigger className="mt-2" id="modal-ai-plan" data-testid="select-ai-employee-plan">
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
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
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
              <Label htmlFor="modal-phone">Phone (Optional)</Label>
              <Input
                id="modal-phone"
                type="tel"
                {...form.register("phone")}
                placeholder="(555) 123-4567"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modal-message">How Can We Help?</Label>
            <p className="text-sm text-muted-foreground mt-2">
              Tell us what you want handled (calls, back-office tasks, or both) and we'll recommend the best plan.
            </p>
            <Textarea
              id="modal-message"
              {...form.register("message")}
              placeholder="Share the tasks or calls you want handled and any details that would help us recommend a plan."
              rows={4}
              className="mt-2 resize-none"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="modal-consent"
              checked={form.watch("consent")}
              onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
            />
            <div className="flex-1">
              <Label
                htmlFor="modal-consent"
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
      </DialogContent>
    </Dialog>
  );
}
=======
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormModal({ open, onOpenChange }: ContactFormModalProps) {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get a Free Quote</DialogTitle>
          <DialogDescription>
            Tell us about your business and we'll show you how AI automation can help you save time and grow.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div>
            <Label htmlFor="modal-name">Full Name</Label>
            <Input
              id="modal-name"
              {...form.register("name")}
              placeholder="John Smith"
              className="mt-2"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
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
              <Label htmlFor="modal-phone">Phone (Optional)</Label>
              <Input
                id="modal-phone"
                type="tel"
                {...form.register("phone")}
                placeholder="(555) 123-4567"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modal-message">How Can We Help?</Label>
            <Textarea
              id="modal-message"
              {...form.register("message")}
              placeholder="Tell us about your business and what you're looking to automate..."
              rows={4}
              className="mt-2 resize-none"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="modal-consent"
              checked={form.watch("consent")}
              onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
            />
            <div className="flex-1">
              <Label
                htmlFor="modal-consent"
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
            {contactMutation.isPending ? "Sending..." : "Get Your Free Quote"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
>>>>>>> 558b7d7b2db4ede74dd95f8d8ef08d71e63f3bc6
