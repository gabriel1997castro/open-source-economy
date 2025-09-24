import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import newsletterRoutes from "./routes/newsletter";
import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // In development, allow localhost origins
    if (process.env.NODE_ENV !== "production") {
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
    }

    // Get allowed origins from environment variables
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      process.env.FRONTEND_URL,
      // Add Vercel preview domains
      ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ].filter(Boolean);

    // Check if origin is in allowed list
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
      callback(null, true); // Allow for now, set to false for strict CORS
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Routes
app.use("/api/contact", contactRoutes);

app.use("/api/newsletter", newsletterRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(globalErrorHandler);

export default app;
