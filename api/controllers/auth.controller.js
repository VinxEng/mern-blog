import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandle } from "../utils/error.js";

export const signup = async (req, res, next) => {
	// console.log(req.body);
	const { username, email, password } = req.body;
	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		email === "" ||
		password === ""
	) {
		// return res.status(400).json({ msg: "All fields are required!" });
		next(errorHandle(400, "All fields are required!"));
	}

	const hashPassword = bcrypt.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashPassword,
	});

	try {
		await newUser.save();
		res.json({ msg: "Signup Success!" });
	} catch (error) {
		next(error);
	}
};