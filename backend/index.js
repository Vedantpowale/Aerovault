import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

/*
==============================
CORS CONFIGURATION
==============================
Allow requests from:
- Local development
- Your Vercel frontend
*/

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "https://aerovault.vercel.app",
  "https://aerovault-nine.vercel.app",
  "https://aerovault.onrender.com"
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const normalizedAllowedOrigins = new Set([...allowedOrigins, ...envAllowedOrigins]);

function isVercelPreviewOrigin(origin) {
  return /^https:\/\/aerovault(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);
}

function isOriginAllowed(origin) {
  return normalizedAllowedOrigins.has(origin) || isVercelPreviewOrigin(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true
  })
);

app.use(express.json());

/*
==============================
ROOT / HEALTH CHECK
==============================
*/

app.get("/", (req, res) => {
  res.send("Aerovault backend running");
});

/*
==============================
API TEST ROUTE
==============================
*/

app.get("/api/test", (req, res) => {
  res.json({
    status: "success",
    message: "Backend connected successfully"
  });
});

/*
==============================
EXAMPLE DATA ROUTE
==============================
*/

app.get("/api/flights", (req, res) => {
  const flights = [
    {
      id: 1,
      airline: "Air India",
      from: "Mumbai",
      to: "Delhi",
      price: 5200
    },
    {
      id: 2,
      airline: "IndiGo",
      from: "Pune",
      to: "Bangalore",
      price: 4300
    }
  ];

  res.json(flights);
});

/*
==============================
CORS ERROR HANDLER
==============================
*/

app.use((err, req, res, next) => {
  if (err && err.message === "CORS not allowed") {
    return res.status(403).json({
      error: "CORS not allowed",
      origin: req.headers.origin || null
    });
  }

  return next(err);
});

/*
==============================
404 HANDLER
==============================
*/

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/*
==============================
SERVER START
==============================
*/

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
