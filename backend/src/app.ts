import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import newsletterRoutes from "./routes/newsletter";
import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      // Development URLs
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:4173",
      // Production URLs
      "https://open-source-economy-frontend.vercel.app",
      "https://open-source-economy-backend-k0vkj9eu5.vercel.app",
      // Environment variable override
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
      // Vercel preview deployments
      /^https:\/\/.*-gabriel1997castro\.vercel\.app$/,
      /^https:\/\/.*\.vercel\.app$/,
    ];

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (typeof allowedOrigin === "string") {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
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
