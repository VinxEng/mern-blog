import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
		next(errorHandler(400, "All fields are required!"));
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

export const signin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || email === "" || password === "") {
		next(errorHandler(400, "Hãy điền đầy đủ thông tin."));
	}

	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "Email không hợp lệ!"));
		}
		const validPass = bcrypt.compareSync(password, validUser.password);
		if (!validPass) {
			return next(errorHandler(400, "Password không hợp lệ."));
		}

		const token = jwt.sign(
			{ id: validUser._id, isAdmin: validUser.isAdmin },
			process.env.JWT_SECRET
		);

		//* Dòng này sử dụng tính năng phá hủy đối tượng để tạo một phần còn lại đối tượng mới.
		//* Loại trừ thuộc tính mật khẩu khỏi đối tượng validUser._doc.
		//* Điều này đảm bảo mật khẩu không được gửi lại cho khách hàng trong phản hồi.
		const { password: pass, ...rest } = validUser._doc;
		res
			.status(200)
			.cookie("access_token", token, {
				//* Cờ httpOnly đảm bảo JavaScript không thể truy cập cookie ở phía máy khách vì lý do bảo mật.
				httpOnly: true,
			})
			.json(rest);
	} catch (error) {
		next(error);
	}
};

export const google = async (req, res, next) => {
	const { email, name, googlePhotoUrl } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECRET
			);
			const { password, ...rest } = user._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
				})
				.json(rest);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email,
				password: hashedPassword,
				profilePicture: googlePhotoUrl,
			});
			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			const { password, ...rest } = newUser._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
				})
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};
