import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
	const auth = useSelector((state) => state.auth);

	const renderLoggedInLinks = (props) => {
		return (
			<Nav>
				<li className="nav-item">
					<span className="nav-link">Sign Out</span>
				</li>
			</Nav>
		);
	};

	const renderNonLoggedInLinks = (props) => {
		return (
			<Nav>
				<li className="nav-item">
					<NavLink to="/signin" className="nav-link">
						Sign In
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/signup" className="nav-link">
						Sign Up
					</NavLink>
				</li>
			</Nav>
		);
	};

	return (
		<Navbar bg="light" expand="lg" style={{ zIndex: 1 }}>
			<Container fluid>
				<Link to="/" className="navbar-brand">
					Admin Dashboard
				</Link>
				{auth.authenticate
					? renderLoggedInLinks()
					: renderNonLoggedInLinks()}
			</Container>
		</Navbar>
	);
}
