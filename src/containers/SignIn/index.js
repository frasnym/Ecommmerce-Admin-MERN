import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch } from "react-redux";

export default function SignIn() {
	const dispatch = useDispatch();

	const userLogin = (e) => {
		e.preventDefault(); // disable redirect page

		const user = {
			email: "mico@example.com",
			password: "123456",
		};

		dispatch(login(user)); // execute "actions"
	};

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userLogin}>
							<Input
								label="Email Address"
								type="email"
								placeholder="Enter email"
								value=""
								onChange={() => {}}
							/>
							<Input
								label="Password"
								type="password"
								placeholder="Enter password"
								value=""
								onChange={() => {}}
							/>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
