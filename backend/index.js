import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// FIX THIS:
import secretRoutes from "./routes/SecretRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route middleware
app.use("/api/secrets", secretRoutes);

// ✅ DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error ➡️", err));
