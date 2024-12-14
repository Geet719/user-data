import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import router from "./routes/userRoute.js";
import cors from "cors";
import User from "./models/userModel.js"; // Import your User model

// Load environment variables from .env file
config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected successfully to MongoDB");

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.error("Error connecting to MongoDB:", error.message));

// Route to show all users on the root URL
app.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Use the router with a base path
app.use("/api/users", router);
