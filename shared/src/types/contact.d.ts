import { contactFormSchema } from "../validation";
import { z } from "zod";
export interface ContactSubmissionResponse {
    id: number;
    message: string;
}
export type ContactFormData = z.infer<typeof contactFormSchema>;
