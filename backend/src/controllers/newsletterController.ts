import { Request, Response } from "express";
import { NewsletterData, ApiResponse } from "@open-source-economy/shared";
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
}
