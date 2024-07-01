import express from "express";
import {
	getUser,
	updateUser,
	deleteUser,
	signout,
} from "../controllers/user.controler.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", getUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);

export default router;
