import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
	const [formData, setFormData] = useState({});
	// const [errorMessage, setErrorMessage] = useState(null);
	// const [loading, setLoading] = useState(false);
	const { loading, error: errorMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	/**
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
		// console.log(formData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			// return setErrorMessage("Hãy điền đầy đủ thông tin.");
			return dispatch(signInFailure("Hãy điền đầy đủ thông tin."));
		}
		try {
			// setLoading(true);
			// setErrorMessage(null);
			dispatch(signInStart());
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				// return setErrorMessage(data.message);
				dispatch(signInFailure(data.message));
			}
			// setLoading(false);
			if (res.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			// setErrorMessage(error.message);
			// setLoading(false);
			dispatch(signInFailure(error.message));
		}
	};

	return (
		<div className="min-h-screen mt-20">
			{/* Left */}
			<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
				<div className="flex-1">
					<Link
						to="/"
						className="font-logo font-bold self-center text-4xl dark:text-white"
					>
						Vinx<span className="text-brand-700">&nbsp;Blog's</span>
					</Link>
					<p className="text-sm mt-5">
						This is a demo project. You can sign in with your email and password
						or with Google.
					</p>
				</div>
				{/* Right */}
				<div className="flex-1">
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<div>
							<Label value="Your Email"></Label>
							<TextInput
								type="email"
								placeholder="name@company.com"
								id="email"
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label value="Your Password"></Label>
							<TextInput
								type="password"
								placeholder="********"
								id="password"
								onChange={handleChange}
							/>
						</div>

						<Button
							gradientDuoTone="purpleToPink"
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<>
									<Spinner size="sm" />
									<span className="pl-3">Loading...</span>
								</>
							) : (
								"Sign In"
							)}
						</Button>
						<OAuth />
					</form>
					<div className="flex gap-2 text-sm mt-5">
						<span>Don't have an account?&nbsp;</span>
						<Link to="/sign-up" className="text-blue-500">
							Sign Up
						</Link>
					</div>
					{errorMessage && (
						<Alert className="mt-5" color="failure">
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignIn;
