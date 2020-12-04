import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Link to="/" className="navbar-brand">
					Admin Dashboard
				</Link>
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
			</Container>
		</Navbar>
	);
}
