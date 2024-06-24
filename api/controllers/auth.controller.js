import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandle } from "../utils/error.js";
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

export const signin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || email === "" || password === "") {
		next(errorHandle(400, "Hãy điền đầy đủ thông tin."));
	}

	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandle(404, "Email không hợp lệ!"));
		}
		const validPass = bcrypt.compareSync(password, validUser.password);
		if (!validPass) {
			return next(errorHandle(400, "Password không hợp lệ."));
		}

		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

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
