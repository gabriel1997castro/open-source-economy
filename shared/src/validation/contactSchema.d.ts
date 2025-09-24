import { z } from "zod";
export declare const contactFormSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    linkedin: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodLiteral<"">]>;
    message: z.ZodString;
}, z.core.$strip>;
