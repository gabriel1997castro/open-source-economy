import { Request, Response } from "express";
import {
  contactFormSchema,
  ContactFormData,
} from "@open-source-economy/shared";
import { ContactService } from "../services/contactService";

export class ContactController {
  static async createContactSubmission(req: Request, res: Response) {
    try {
      // Validation
      const validation = contactFormSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: validation.error.issues,
        });
      }

      const data: ContactFormData = validation.data;

      // Business logic
      const submission = await ContactService.createContactSubmission(data);

      console.log("Contact form submitted:", submission.id);

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
  }

  static async getContactSubmissions(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const submissions = await ContactService.getContactSubmissions(
        limit,
        offset
      );

      return res.json({
        success: true,
        data: submissions,
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch contact submissions",
      });
    }
  }

  static async getContactSubmissionById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid submission ID",
        });
      }

      const submission = await ContactService.getContactSubmissionById(id);

      if (!submission) {
        return res.status(404).json({
          success: false,
          error: "Contact submission not found",
        });
      }

      return res.json({
        success: true,
        data: submission,
      });
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch contact submission",
      });
    }
  }
}
