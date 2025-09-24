import { Request, Response, NextFunction } from "express";
import { ApiResponse, ContactFormData } from "../../../shared/src/types";
import { ContactService } from "../services/contactService";
import { asyncHandler } from "../middleware/errorHandler";

export class ContactController {
  static createContactSubmission = asyncHandler(
    async (req: Request, res: Response) => {
      const data: ContactFormData = req.body;
      const submission = await ContactService.createContactSubmission(data);

      const response: ApiResponse<{ id: number }> = {
        success: true,
        message: "Thank you for your message! We'll get back to you soon!",
        data: { id: submission.id },
      };
      return res.status(201).json(response);
    }
  );

  static getContactSubmissions = asyncHandler(
    async (req: Request, res: Response) => {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await ContactService.getContactSubmissions(limit, offset);

      const response: ApiResponse<typeof result> = {
        success: true,
        data: result,
      };

      return res.json(response);
    }
  );

  static getContactSubmissionById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Invalid submission ID",
        };
        return res.status(400).json(response);
      }

      const submission = await ContactService.getContactSubmissionById(id);

      if (!submission) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Contact submission not found",
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof submission> = {
        success: true,
        data: submission,
      };
      return res.json(response);
    }
  );

  static deleteContactSubmission = asyncHandler(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Invalid submission ID",
        };
        return res.status(400).json(response);
      }

      try {
        const result = await ContactService.deleteContactSubmission(id);

        const response: ApiResponse<typeof result> = {
          success: true,
          message: "Contact submission deleted successfully",
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Contact submission not found"
        ) {
          const response: ApiResponse<null> = {
            success: false,
            error: "Contact submission not found",
          };
          return res.status(404).json(response);
        }
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static cleanupTestContacts = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const result = await ContactService.deleteTestContacts();

        const response: ApiResponse<typeof result> = {
          success: true,
          message: `Deleted ${result.deletedCount} test contact submissions`,
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static cleanupContactsByEmails = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { emails } = req.body;

      if (!emails || !Array.isArray(emails)) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Emails array is required",
        };
        return res.status(400).json(response);
      }

      try {
        const result = await ContactService.deleteContactsByEmails(emails);

        const response: ApiResponse<typeof result> = {
          success: true,
          message: `Deleted ${result.deletedCount} contact submissions`,
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        throw error; // Let asyncHandler catch other errors
      }
    }
  );
}
