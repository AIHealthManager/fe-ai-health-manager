import * as z from "zod"

export const visitFormSchema = z.object({
  visit_date: z.string().min(1, { message: "Visit date is required." }),
  doctor_name: z.string().min(2, { message: "Doctor name is too short." }),
  reason: z.string().min(3, { message: "Reason must be at least 3 characters." }),
  diagnosis: z.string().min(3, { message: "Diagnosis must be at least 3 characters." }),
  notes: z.string().optional(),
});
