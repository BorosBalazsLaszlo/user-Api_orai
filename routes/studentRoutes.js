import express from "express";
import { RunDb, DbQuery } from "../database.js";

const router = express.Router();

// GET - /users
router.get("/users", async (req, res) => {
  try {
    const user = await DbQuery("SELECT * FROM Users", []);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - /users/:id
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [user] = await DbQuery("SELECT * FROM Users WHERE id = ?", [userId]);
    if (!user) {
      res.status(404).json({ message: "Nincs ilyen felhasználó" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/users", async (req, res) => {
  const { firstName, lastName, email, userClass } = req.body;
  if (!firstName || !lastName || !email || !userClass) {
    return res.status(400).json({ message: "Töltse ki az összes mezőt!" });
  }
  try {
    const result = await RunDb(
      "INSERT INTO Users (firstName, lastName, email, userClass) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, userClass]
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PUT - /users/:id
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, userClass } = req.body;
  if (!firstName || !lastName || !email || !userClass) {
    return res.status(400).json({ message: "Töltse ki az összes mezőt!" });
  }
  try {
    const result = await RunDb(
      "UPDATE Users SET firstName = ?, lastName = ?, email = ?, userClass = ? WHERE id = ?",
      [firstName, lastName, email, userClass, userId]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - /users/:id
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await RunDb("DELETE FROM Users WHERE id = ?", [userId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;