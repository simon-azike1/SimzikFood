require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menu");
const authRoutes = require("./routes/auth");
const { seedAdmin } = require("./controllers/authController");

const app = express();

app.set("trust proxy", 1); // ← ADD THIS LINE

connectDB().then(() => seedAdmin());

app.use(cors());
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts. Try again in 15 minutes." }
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);
app.use(cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "https://simzik-food.vercel.app",
    ],
    credentials: true
  }));

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));