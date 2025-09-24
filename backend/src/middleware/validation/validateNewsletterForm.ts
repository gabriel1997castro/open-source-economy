import { Request, Response, NextFunction } from "express";
import { newsletterSchema } from "../../../../shared/src/validation";

export const validateNewsletterForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = newsletterSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validation.error.issues,
    });
  }

  req.body = validation.data;
  next();
};
