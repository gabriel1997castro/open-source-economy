import express, { Request, Response } from "express";
import {
  contactFormSchema,
  ContactFormData,
} from "@open-source-economy/shared";
import { ContactService } from "../services/contactService";

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

    console.log("Contact form data:", data);
    const submission = await ContactService.createContactSubmission(data);

    return res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon!",
      data: { id: submission.id },
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
