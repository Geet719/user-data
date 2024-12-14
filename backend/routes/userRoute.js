import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Ensure the route for a single user by ID is correct
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Ensure the delete operation is correctly implemented
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const singleUser = await User.findByIdAndDelete(id);
        if (!singleUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Ensure the update operation is correctly implemented
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
