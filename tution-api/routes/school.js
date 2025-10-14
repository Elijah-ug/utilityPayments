import express from "express";
import { schools, school, addSchool, updateSchool } from "../controllers/schoolsController.js";
const router = express.Router();

router.get("/", schools);
router.get("/:school", school);
router.post("/", addSchool);
router.put("/:school", updateSchool);

export default router;
