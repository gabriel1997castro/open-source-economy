import { z } from "zod";
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.email("Invalid email format").max(255),
  linkedin: z.url("Invalid LinkedIn URL").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
