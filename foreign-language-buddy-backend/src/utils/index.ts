import { GEMINI } from "./gemini";
import dotenv from "dotenv";
dotenv.config();


const gemini = new GEMINI(process.env.GEMINI_API_KEY);

export { gemini };

