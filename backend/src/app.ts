import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import newsletterRoutes from "./routes/newsletter";
import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://open-source-economy-frontend.vercel.app/",
    ],
  })
);
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

app.use("/api/newsletter", newsletterRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(globalErrorHandler);

export default app;
