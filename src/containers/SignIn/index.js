import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch } from "react-redux";
import ip from "ip";

export default function SignIn() {
	const [email, setEmail] = useState("an1@example.com"); // state value
	const [password, setPassword] = useState("1234567"); // state value
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const userLogin = (e) => {
		e.preventDefault(); // disable redirect page

		const user = {
			email_address: email,
			password,
			ip_address: ip.address(),
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								type="password"
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
