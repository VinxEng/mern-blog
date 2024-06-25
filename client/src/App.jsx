import React from "react";
import {
	About,
	Dashboard,
	Home,
	NotFound,
	Projects,
	SignIn,
	SignUp,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="/projects" element={<Projects />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
