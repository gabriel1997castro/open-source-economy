import { contactFormSchema } from "../validation";
import { z } from "zod";

export interface ContactSubmissionResponse {
  id: number;
  message: string;
}

// Using type from zod validation to make it consistent
export type ContactFormData = z.infer<typeof contactFormSchema>;
