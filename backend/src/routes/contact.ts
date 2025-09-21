import express, { Request, Response } from "express";
import {
  contactFormSchema,
  ContactFormData,
} from "@open-source-economy/shared";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const validation = contactFormSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validation.error.issues,
      });
    }

    const data: ContactFormData = validation.data;

    // TODO: Save to database
    console.log("Contact form data:", data);

    return res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to submit contact form. Please try again.",
    });
  }
});

export default router;
