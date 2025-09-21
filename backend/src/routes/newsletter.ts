import express from "express";
import { NewsletterController } from "../controllers/newsletterController";
import { validateNewsletterForm } from "../middleware/validation/validateNewsletterForm";

const router = express.Router();

// POST /api/newsletter - Subscribe to newsletter
router.post(
  "/",
  validateNewsletterForm,
  NewsletterController.subscribeToNewsletter
);

// GET /api/newsletter - Get all subscriptions (admin)
router.get("/", NewsletterController.getNewsletterSubscriptions);

export default router;
