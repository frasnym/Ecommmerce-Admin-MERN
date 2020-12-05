import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions";

import Layout from "../../components/Layout";

export default function Categories() {
	const category = useSelector((state) => state.categories);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push(
				<li>
					{category.name}
					{category.children.length > 0 ? (
						<ul>{renderCategories(category.children)}</ul>
					) : null}
				</li>
			);
		}

		return myCategories;
	};

	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h3>Categories</h3>
							<button>Add</button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ul>{renderCategories(category.categories)}</ul>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
