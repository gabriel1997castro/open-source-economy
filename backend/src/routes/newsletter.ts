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

// DELETE /api/newsletter/:id - Delete specific subscription (admin)
router.delete("/:id", NewsletterController.deleteNewsletterSubscription);

// POST /api/newsletter/unsubscribe - Unsubscribe by email (public)
router.post("/unsubscribe", NewsletterController.unsubscribeByEmail);

export default router;
