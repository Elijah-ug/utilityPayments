import express from "express";
import { schools } from "../controllers/schoolsController.js";
const router = express.Router();

router.get("/", schools);
export default router;
