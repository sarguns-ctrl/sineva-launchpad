import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20).optional().or(z.literal("")),
  business_type: z.string().min(1, "Please select a business type"),
  investment_budget: z.string().min(1, "Please select your investment budget"),
  agree_privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type FormData = z.infer<typeof formSchema>;

const EstablishedBusinessLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      business_type: "",
      investment_budget: "",
      agree_privacy: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the edge function
      const { data: responseData, error } = await supabase.functions.invoke('established-business-leads', {
        body: {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          business_type: data.business_type,
          investment_budget: data.investment_budget,
        },
      });

      if (error) throw error;

      // Show success state
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Success!",
        description: "We'll send you active business listings within 24 hours.",
      });

      // Scroll to top after success
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-gold/30 shadow-gold bg-white">
        <CardContent className="p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-foreground">Thank You!</h3>
            <p className="text-lg text-muted-foreground">
              Your request has been received. We'll send you active business listings within 24 hours.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email inbox (and spam folder) for our message.
            </p>
          </div>
          <Button 
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-white"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/30 shadow-2xl bg-white">
      <CardHeader className="text-center space-y-3 pb-8">
        <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
          Get Access to Verified Businesses for Sale in Texas
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Tell us what kind of business you're looking for — we'll send you active opportunities within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Smith" 
                      {...field} 
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field}
                      className="h-12 text-base"
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
                  <FormLabel className="text-base font-semibold">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="(555) 123-4567" 
                      {...field}
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Business Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="laundromat">Laundromat</SelectItem>
                      <SelectItem value="gas-station">Gas Station</SelectItem>
                      <SelectItem value="convenience-store">Convenience Store</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="salon">Salon</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="mobile-store">Mobile Store</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investment_budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Investment Budget *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                      <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                      <SelectItem value="500k+">$500K+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agree_privacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      I agree to be contacted by Sinevabrokerage in accordance with the Privacy Policy. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90 text-white shadow-accent"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "✅ Send Me Listings"
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
              <Lock className="w-4 h-4" />
              <span>Your details are 100% confidential. We never share your information.</span>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EstablishedBusinessLeadForm;
