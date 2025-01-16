import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routers";
import dbConnect from "./mongodb";
import migrate from "./migrate";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Initialize server asynchronously
async function initializeServer() {
    try {
        // Wait for database connection
        await dbConnect("foreign-language-buddy");
        // Wait for migration
        await migrate();

        app.use("/api", router);

        app.listen(5050, () => {
            console.log("Server is running on port 5050");
        });
    } catch (error) {
        console.error("Failed to initialize server:", error);
        process.exit(1);
    }
}

initializeServer();

