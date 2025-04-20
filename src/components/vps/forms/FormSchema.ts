
import * as z from "zod";

export const purchaseFormSchema = z.object({
  hostname: z.string().min(3, {
    message: "Hostname must be at least 3 characters.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Please enter your name.",
  }),
  duration: z.enum(['1', '3', '6', '12'], {
    required_error: "Please select a lease duration.",
  })
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
