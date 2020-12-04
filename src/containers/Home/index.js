import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout";

export default function Home() {
	return (
		<Layout>
			<Jumbotron
				style={{ margin: "5rem", background: "white" }}
				className="text-center"
			>
				<h1>Welcome to Admin Dashboard</h1>
				<p>lorem</p>
			</Jumbotron>
		</Layout>
	);
}
