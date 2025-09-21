import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(globalErrorHandler);

export default app;
