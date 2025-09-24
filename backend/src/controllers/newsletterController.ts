import { Request, Response } from "express";
import { NewsletterData, ApiResponse } from "../../../shared/src/types";
import { NewsletterService } from "../services/newsletterService";
import { asyncHandler } from "../middleware/errorHandler";

export class NewsletterController {
  static subscribeToNewsletter = asyncHandler(
    async (req: Request, res: Response) => {
      const data: NewsletterData = req.body;

      try {
        const subscription = await NewsletterService.subscribeToNewsletter(
          data
        );

        const response: ApiResponse<{ id: number }> = {
          success: true,
          message: "Thank you for subscribing to our newsletter!",
          data: { id: subscription.id },
        };

        return res.status(201).json(response);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "Email is already subscribed to newsletter"
        ) {
          return res.status(409).json({
            success: false,
            error: "This email is already subscribed to our newsletter",
          });
        }
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static getNewsletterSubscriptions = asyncHandler(
    async (req: Request, res: Response) => {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const subscriptions = await NewsletterService.getNewsletterSubscriptions(
        limit,
        offset
      );

      return res.json({
        success: true,
        data: subscriptions,
      });
    }
  );

  static deleteNewsletterSubscription = asyncHandler(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Invalid subscription ID",
        };
        return res.status(400).json(response);
      }

      try {
        const result = await NewsletterService.deleteNewsletterSubscription(id);

        const response: ApiResponse<typeof result> = {
          success: true,
          message: "Newsletter subscription deleted successfully",
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Newsletter subscription not found"
        ) {
          const response: ApiResponse<null> = {
            success: false,
            error: "Newsletter subscription not found",
          };
          return res.status(404).json(response);
        }
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static unsubscribeByEmail = asyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      if (!email) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Email is required",
        };
        return res.status(400).json(response);
      }

      try {
        const result = await NewsletterService.unsubscribeByEmail(email);

        const response: ApiResponse<typeof result> = {
          success: true,
          message: "Successfully unsubscribed from newsletter",
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message === "Newsletter subscription not found" ||
            error.message === "Email is already unsubscribed")
        ) {
          const response: ApiResponse<null> = {
            success: false,
            error: error.message,
          };
          return res.status(404).json(response);
        }
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static cleanupTestSubscriptions = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const result = await NewsletterService.deleteTestSubscriptions();

        const response: ApiResponse<typeof result> = {
          success: true,
          message: `Deleted ${result.deletedCount} test newsletter subscriptions`,
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        throw error; // Let asyncHandler catch other errors
      }
    }
  );

  static cleanupSubscriptionsByEmails = asyncHandler(
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
        const result = await NewsletterService.deleteSubscriptionsByEmails(
          emails
        );

        const response: ApiResponse<typeof result> = {
          success: true,
          message: `Deleted ${result.deletedCount} newsletter subscriptions`,
          data: result,
        };
        return res.status(200).json(response);
      } catch (error) {
        throw error; // Let asyncHandler catch other errors
      }
    }
  );
}
