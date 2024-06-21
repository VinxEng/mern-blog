import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
const app = express();

//
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(`Unable to get database collection: ${err}`));
