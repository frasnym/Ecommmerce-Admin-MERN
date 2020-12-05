import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import "./style.css";

export default function Home() {
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
