import { z } from "zod";
import { newsletterSchema } from "../validation/";

export type NewsletterData = z.infer<typeof newsletterSchema>;

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}
