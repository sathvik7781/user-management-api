const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });
    const newUser = new user({ name, email, age });
    await newUser.save();
    return res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error from post users route", err });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    if (!users) return res.status(404).json({ message: "No users to Show" });
    res.status(200).json({ message: "Data fetch successful", users });
  } catch (err) {
    res.status(500).json({ message: "Error from get users route", err });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const userData = await user.findById(req.params.id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Data fetch successful", userData });
  } catch (err) {
    res.status(500).json({ message: "Error from get users/id route", err });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const userData = await user.findById(req.params.id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    const { name, email, age } = req.body;
    const updatedUser = { name, email, age };
    res.status(200).json({ message: "Data updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error from put users route", err });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User data deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Error from put users route", err });
  }
});

module.exports = router;
