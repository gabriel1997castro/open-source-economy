import express from "express";

import { ContactController } from "../controllers/contactController";

const router = express.Router();

// POST /api/contact - Submit contact form
router.post("/", ContactController.createContactSubmission);

// GET /api/contact - Get all submissions (admin)
router.get("/", ContactController.getContactSubmissions);

// GET /api/contact/:id - Get specific submission (admin)
router.get("/:id", ContactController.getContactSubmissionById);

export default router;
