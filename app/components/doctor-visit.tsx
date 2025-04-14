import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

// Define the form schema with Zod
const formSchema = z.object({
  visitDate: z.date({
    required_error: "Please select a date for your doctor visit.",
  }),
  reason: z.string().min(3, {
    message: "Reason must be at least 3 characters.",
  }),
  diagnosis: z.string().min(3, {
    message: "Diagnosis must be at least 3 characters.",
  }),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function DoctorVisitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would send data to your FastAPI backend
      console.log("Form data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast("Doctor visit added successfully!")

      // Reset the form
      form.reset()
    } catch (error) {
      toast("There was a problem adding your doctor visit.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">Add Doctor Visit</CardTitle>
          <CardDescription>Record details about your doctor appointment for your health records.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="visitDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Visit Date</FormLabel>
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
                    <FormDescription>The date when you visited the doctor.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl>
                      <Input placeholder="Annual check-up, illness, follow-up, etc." {...field} />
                    </FormControl>
                    <FormDescription>Briefly describe why you visited the doctor.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
                    <FormControl>
                      <Input placeholder="What did the doctor diagnose?" {...field} />
                    </FormControl>
                    <FormDescription>Enter the diagnosis provided by your doctor.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes, treatment plans, or follow-up instructions..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Any additional information you want to record about this visit.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
  )
}
