import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout";
import "./style.css";

export default function Home() {
	const auth = useSelector((state) => state.auth);

	if (auth.loading) {
		return <p>Loading....</p>;
	}

	return (
		<Layout>
			<Container fluid>
				<Row>
					<Col md={2} className="sidebar">
						Side
					</Col>
					<Col md={10} style={{ marginLeft: "auto" }}>
						Main
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
