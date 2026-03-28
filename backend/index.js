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
  "http://localhost:5173",
  "https://aerovault.vercel.app",
  "https://aerovault-nine.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

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
