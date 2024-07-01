import "dotenv/config";
// import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();

//
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({ success: false, statusCode, message });
});
const port = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(`Unable to get database collection: ${err}`));
