import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { pageLinks } from "../constants/contents";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";

const Header = () => {
	const path = useLocation().pathname;
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);

	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/signout", {
				method: "POST",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signoutSuccess());
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<Navbar className="border-b-2">
				<Link
					to="/"
					className="font-logo self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
				>
					Vinx<span className="text-brand-700">&nbsp;Blog's</span>
				</Link>
				<form>
					<TextInput
						type="text"
						placeholder="Search..."
						rightIcon={AiOutlineSearch}
						className="hidden lg:inline"
					/>
				</form>
				<Button className="w-12 h-10 lg:hidden" color="gray" pill>
					<AiOutlineSearch />
				</Button>

				<div className="flex gap-2 md:order-2">
					<Button
						className="w-12 h-10 hidden sm:inline"
						color="gray"
						pill
						onClick={() => dispatch(toggleTheme())}
					>
						{theme === "light" ? <FaSun /> : <FaMoon />}
					</Button>
					{/* User Login */}
					{currentUser ? (
						<Dropdown
							arrowIcon={false}
							inline
							label={
								<Avatar alt="user" img={currentUser.profilePicture} rounded />
							}
						>
							<Dropdown.Header>
								<span className="block text-sm">@{currentUser.username}</span>
								<span className="block text-sm font-medium truncate">
									{currentUser.email}
								</span>
							</Dropdown.Header>

							<Link to={"/dashboard?tab=profile"}>
								<Dropdown.Item>Profile</Dropdown.Item>
							</Link>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
						</Dropdown>
					) : (
						<Link to="/sign-in">
							<Button gradientDuoTone="purpleToBlue" outline>
								Sign In
							</Button>
						</Link>
					)}

					<Navbar.Toggle />
				</div>

				<Navbar.Collapse>
					{pageLinks.map((link, idx) => (
						<Navbar.Link key={idx} active={path === link.path} as="div">
							<Link to={link.path}>{link.name}</Link>
						</Navbar.Link>
					))}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
