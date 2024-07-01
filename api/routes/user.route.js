import express from "express";
import {
	getUser,
	updateUser,
	deleteUser,
} from "../controllers/user.controler.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", getUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
