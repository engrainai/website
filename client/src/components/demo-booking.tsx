import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDemoBookingSchema, type InsertDemoBooking } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import chatImage from "@assets/generated_images/AI_chat_interface_mockup_cc6c26f7.png";

export function DemoBooking() {
  const { toast } = useToast();
  const form = useForm<InsertDemoBooking>({
    resolver: zodResolver(insertDemoBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  const bookDemoMutation = useMutation({
    mutationFn: async (data: InsertDemoBooking) => {
      return await apiRequest("POST", "/api/demo-bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Booked Successfully!",
        description: "We'll send you a confirmation email shortly with next steps.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/demo-bookings"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDemoBooking) => {
    bookDemoMutation.mutate(data);
  };

  return (
    <section id="demo" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience firsthand how our AI Voice Receptionist can transform your customer interactions. 
            Book a 15-minute demo call customized to your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Book Your Demo Call</h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="demo-date">Preferred Date</Label>
                    <Input
                      id="demo-date"
                      type="date"
                      {...form.register("preferredDate")}
                      className="mt-2"
                      data-testid="input-demo-date"
                    />
                    {form.formState.errors.preferredDate && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.preferredDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="demo-time">Preferred Time</Label>
                    <Select
                      value={form.watch("preferredTime")}
                      onValueChange={(value) => form.setValue("preferredTime", value)}
                    >
                      <SelectTrigger className="mt-2" data-testid="select-demo-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.preferredTime && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={bookDemoMutation.isPending}
                  data-testid="button-submit-demo"
                >
                  {bookDemoMutation.isPending ? "Booking..." : "Book Demo Call"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>15-minute personalized demo</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Custom to your business needs</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl" />
              <img
                src={chatImage}
                alt="AI Voice Assistant Demo Interface"
                className="relative rounded-xl shadow-2xl border border-border"
              />
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose Your Time</h4>
                  <p className="text-sm text-muted-foreground">Select a time that works best for your schedule</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quick 15-Minute Demo</h4>
                  <p className="text-sm text-muted-foreground">See real AI conversations tailored to your industry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
