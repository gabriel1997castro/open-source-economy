import { Request, Response, NextFunction } from "express";
import { ContactFormData } from "@open-source-economy/shared";
import { ContactService } from "../services/contactService";
import { asyncHandler } from "../middleware/errorHandler";

export class ContactController {
  static createContactSubmission = asyncHandler(
    async (req: Request, res: Response) => {
      const data: ContactFormData = req.body;
      const submission = await ContactService.createContactSubmission(data);

      return res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon!",
        data: { id: submission.id },
      });
    }
  );

  static getContactSubmissions = asyncHandler(
    async (req: Request, res: Response) => {
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
    }
  );

  static getContactSubmissionById = asyncHandler(
    async (req: Request, res: Response) => {
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
    }
  );
}
