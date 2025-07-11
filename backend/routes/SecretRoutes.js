import express from "express";
// import Secret from "../models/Secret.js";
import Secret from "../models/Secret.js"; // ✅ default import now works

const router = express.Router();

// 🧪 TEST POST route
router.post("/", async (req, res) => {
  console.log("➡️ POST /api/secrets called");
  console.log("📦 Received body:", req.body);

  const { title, encrypted } = req.body;

  if (!title || !encrypted) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const newSecret = new Secret({ title, encrypted }); // ✅ Correct mapping


  try {
    await newSecret.save();
    res.status(201).json(newSecret);
  } catch (err) {
    console.error("🔥 Error saving secret:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🧪 TEST GET route
router.get("/", async (req, res) => {
  try {
    const secrets = await Secret.find();
    res.json(secrets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🧪 TEST DELETE route
router.delete("/:id", async (req, res) => {
  try {
    await Secret.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router; // ✅ DEFAULT EXPORT
