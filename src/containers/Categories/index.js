// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import { addCategory, getAllCategories } from "../../actions";
import { addCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

export default function Categories() {
	const category = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getAllCategories());
	// }, [dispatch]);

	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [image, setImage] = useState();
	const [parentId, setParentId] = useState();

	const handleClose = () => {
		const form = new FormData();

		form.append("name", name);
		if (parentId) form.append("parentId", parentId);
		form.append("imageUrl", image);
		dispatch(addCategory(form));

		setShow(false);
	};
	const handleShow = () => setShow(true);

	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push(
				<li key={category._id}>
					{category.name}
					{category.children.length > 0 ? (
						<ul>{renderCategories(category.children)}</ul>
					) : null}
				</li>
			);
		}

		return myCategories;
	};

	const createCategoryList = (categories, options = []) => {
		for (const category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}

		return options;
	};

	const handleCategoryImage = (e) => {
		setImage(e.target.files[0]);
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
							<button onClick={handleShow}>Add</button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ul>{renderCategories(category.categories)}</ul>
					</Col>
				</Row>
			</Container>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<select
						className="form-control"
						value={parentId}
						onChange={(e) => setParentId(e.target.value)}
					>
						<option>select a category</option>
						{createCategoryList(category.categories).map(
							(option) => {
								return (
									<option
										key={option.value}
										value={option.value}
									>
										{option.name}
									</option>
								);
							}
						)}
					</select>
					{/* <Input
						type="file"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/> */}
					<input
						type="file"
						name="image"
						onChange={handleCategoryImage}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Layout>
	);
}
