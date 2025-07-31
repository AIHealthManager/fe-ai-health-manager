import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { postVisit } from "~/api/visit";
import type { VisitCreate } from "~/lib/types";
import { visitFormSchema } from "~/lib/schemas";
import { useNavigate } from "react-router";

export default function DoctorVisitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const form = useForm<VisitCreate>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      visit_datetime: "",
      location: "",
      doctor_name: "",
      referred_by: "",
      reason: "",
      observations: "",
      diagnosis: "",
      referred_to: "",
      treatment: "",
      intervention: "",
      user_feedback: "",
    },
  });

  const onSubmit = async (data: VisitCreate) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token") as string;
      await postVisit(token, data);
      toast("Doctor visit added successfully!");
      navigate("/visits-list");
    } catch (error) {
      console.error(error);
      toast("There was a problem adding your doctor visit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">Add Doctor Visit</CardTitle>
          <CardDescription>
            Record all relevant information from your doctor appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="visit_datetime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Visit Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(new Date(field.value), "PPP") : <span>Select a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString())}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Date of the doctor visit.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {[
                ["location", "Location of Visit", "Clinic or hospital location."],
                ["doctor_name", "Doctor Name", "Full name of the doctor you visited."],
                ["referred_by", "Referred By", "Who referred you to this visit (if anyone)."],
                ["reason", "Reason for Visit", "Why you visited the doctor."],
                ["observations", "Observations", "What was observed during the visit."],
                ["diagnosis", "Diagnosis", "Diagnosis made by the doctor."],
                ["referred_to", "Referred To", "Any referral made by the doctor."],
                ["treatment", "Treatment", "Treatments or prescriptions given."],
                ["intervention", "Intervention", "Any intervention performed."],
                ["user_feedback", "Your Feedback", "Your thoughts or feedback after the visit."],
              ].map(([name, label, desc]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof VisitCreate}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        {name === "observations" || name === "user_feedback" ? (
                          <Textarea placeholder={label} className="min-h-[100px]" {...field} />
                        ) : (
                          <Input placeholder={label} {...field} />
                        )}
                      </FormControl>
                      <FormDescription>{desc}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Doctor Visit"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-slate-500">This information is securely stored and only accessible by you.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
