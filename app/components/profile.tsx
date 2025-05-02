import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { getUserProfile } from "~/api/profile";
import type { ProfileData, ProfileFormValues } from "~/lib/types";
import { BloodTypeEnum, SexEnum } from "~/lib/enums";
import { useAuth } from "~/context/auth-provider";

const formSchema = z.object({
  sex: z.nativeEnum(SexEnum, {
    required_error: "Please select your biological sex.",
  }),
  birth_date: z.date({
    required_error: "Please enter your date of birth.",
  }),
  blood_type: z.nativeEnum(BloodTypeEnum, {
    required_error: "Please select your blood type.",
  }),
});

const formDefaultValues: ProfileFormValues = {
  sex: SexEnum.Male,
  birth_date: new Date("1990-01-01"),
  blood_type: BloodTypeEnum.O_Neg,
};

const getUserProfileWrapper = async (token: string) => {
  try {
    const data = await getUserProfile(token);
    const loadedFormData: ProfileFormValues = {
      sex: data.sex,
      birth_date: new Date(data.birth_date),
      blood_type: data.blood_type,
    };
    return loadedFormData;
  } catch (error) {
    if (error instanceof Error && error.message === "No profile found!") {
      return formDefaultValues;
    }
    throw new Error("Unknown error occurred while loading profile!");
  }
};

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token") as string;
      try {
        const data = await getUserProfileWrapper(token);
        const loadedFormData: ProfileFormValues = {
          sex: data.sex,
          birth_date: new Date(data.birth_date),
          blood_type: data.blood_type,
        };
        form.reset(loadedFormData);
      } catch (error) {
        console.log(error);
        toast("There was a problem getting your profile info.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);

    try {
      console.log("Saving profile data:", data);

      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">My Profile 2</CardTitle>
          <CardDescription>View and update your personal health profile.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input value={user?.first_name} readOnly placeholder="First Name" />
              <Input value={user?.last_name} readOnly placeholder="Last Name" />
            </div>
            <Input value={user?.email} readOnly placeholder="Email" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your biological sex for medical purposes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TODO Use this style */}
              {/* <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>This will be used to calculate your age.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          if (!isNaN(date.getTime())) {
                            field.onChange(date);
                          }
                        }}
                        placeholder="YYYY-MM-DD"
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blood_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your blood type can help in emergencies.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-slate-500">Your profile data is secure and private.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
