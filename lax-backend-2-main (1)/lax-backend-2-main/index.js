import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "node:dns";
import connectDB from "./database/dbConfig.js";
import contactRoutes from "./Routes/contactRoutes.js";
import careerRoutes from "./Routes/careerRoutes.js";
import jobRoutes from "./Routes/jobRoutes.js";

// Force IPv4 for DNS resolution to avoid ENETUNREACH errors on ipv6-incompatible environments
dns.setDefaultResultOrder("ipv4first");

//dotenv config
dotenv.config();

//app initialization
const app = express();

//default middleware
app.use(express.json());

//3rd parties middleware
app.use(cors());

//default routes
app.get("/", (req, res) => {
  res.send("Welcome to Lax 360 Backend");
});

//routes
app.use("/api/contacts", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/jobs", jobRoutes);

//database connection
connectDB();

//port initialization
const port = process.env.PORT || 5000;

//server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});