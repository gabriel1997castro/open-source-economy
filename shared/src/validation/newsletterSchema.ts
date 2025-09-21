import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Invalid email format").max(255),
});
