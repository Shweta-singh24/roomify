import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Load env variables
dotenv.config();
// Routes
import userRoutes from "./routes/userRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";

const app = express();

app.use(
  session({
    secret: "google_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Connect database
connectDB();



// Middleware
app.use(cors());
app.use(express.json()); // JSON body parser

// Test route
app.get("/", (req, res) => {
  res.send("StaySmart API is running...");
});

// User routes
app.use("/api/users", userRoutes);

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});