import { Request, Response, NextFunction } from "express";
import { contactFormSchema } from "../../../../shared/src/validation";

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = contactFormSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validation.error.issues,
    });
  }

  req.body = validation.data; // Set validated data
  next();
};
