import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { pageLinks } from "../constants/contents";

const Header = () => {
	const path = useLocation().pathname;
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
					<Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
						<FaMoon />
					</Button>
					<Link to="/sign-in">
						<Button gradientDuoTone="purpleToBlue" outline>
							Sign In
						</Button>
					</Link>
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
