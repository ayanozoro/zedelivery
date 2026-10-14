import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authroutes from "./routes/auth.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authroutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Auth service is running!");
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  connectDB();
})