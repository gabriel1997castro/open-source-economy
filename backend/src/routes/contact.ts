import express from "express";

import { ContactController } from "../controllers/contactController";
import { validateContactForm } from "../middleware/validation/validateContactForm";

const router = express.Router();

// POST /api/contact - Submit contact form
router.post(
  "/",
  validateContactForm,
  ContactController.createContactSubmission
);

// GET /api/contact - Get all submissions (admin)
router.get("/", ContactController.getContactSubmissions);

// GET /api/contact/:id - Get specific submission (admin)
router.get("/:id", ContactController.getContactSubmissionById);

export default router;
