import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactRequestSchema, type InsertContactRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Send } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<InsertContactRequest>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      automationGoal: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactRequest) => {
      return await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setSubmitSuccess(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thank you! We'll be in touch within 24 hours.",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
    onError: (error: any) => {
      const errorMessage = error?.error || "Something went wrong. Please try again.";
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactRequest) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Get Started
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Let's Free Up Your Time!
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your automation needs and we'll get back to you within 24 hours.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  We've received your message and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              data-testid="input-firstName"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              data-testid="input-lastName"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            data-testid="input-phone"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Business Name"
                            data-testid="input-company"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="automationGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What are you hoping to automate? *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your automation needs..."
                            className="min-h-[120px] resize-none"
                            data-testid="input-automationGoal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Required fields
                  </p>
                </form>
              </Form>
            )}
          </div>

          {/* Right: What to Expect */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quick Response</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll review your information and respond within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discovery Call</h4>
                    <p className="text-sm text-muted-foreground">
                      15-minute conversation to understand your unique business needs and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Proposal</h4>
                    <p className="text-sm text-muted-foreground">
                      Tailored automation strategy designed specifically for your business goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Implementation</h4>
                    <p className="text-sm text-muted-foreground">
                      Smooth setup with training and ongoing support to ensure success.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-4">Or Contact Us Directly</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <a
                    href="mailto:logan@engrainai.com"
                    className="text-primary hover:underline"
                    data-testid="link-email-contact"
                  >
                    logan@engrainai.com
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <a
                    href="tel:623-632-0933"
                    className="text-primary hover:underline"
                    data-testid="link-phone-contact"
                  >
                    (623) 632-0933
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
