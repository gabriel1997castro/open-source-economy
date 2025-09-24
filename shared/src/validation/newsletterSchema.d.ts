import { z } from "zod";
export declare const newsletterSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
