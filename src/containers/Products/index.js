import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

export default function Products() {
	const [show, setShow] = useState(false);

	const [name, setName] = useState(
		"Samsung Galaxy Z Flip (8GB/256GB) - Mirror Black"
	);
	const [price, setPrice] = useState(20999000);
	const [quantity, setQuantity] = useState(3);
	const [description, setDescription] = useState(
		"Deskripsi Samsung Galaxy Z Flip (8GB/256GB) - Mirror Black"
	);
	const [categoryId, setCategoryId] = useState();
	const [images, setImages] = useState([]);

	const category = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getAllCategories());
	// }, [dispatch]);

	const handleClose = () => {
		const form = new FormData();

		form.append("name", name);
		form.append("price", price);
		form.append("quantity", quantity);
		form.append("description", description);
		form.append("category", categoryId);
		for (const image of images) {
			form.append("images", image);
		}

		dispatch(addProduct(form));
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const createCategoryList = (categories, options = []) => {
		for (const category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}

		return options;
	};

	const handleImages = (e) => {
		setImages([...images, e.target.files[0]]);
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
							<h3>Products</h3>
							<button onClick={handleShow}>Add</button>
						</div>
					</Col>
				</Row>
			</Container>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Products</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Enter price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Enter quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Enter description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<select
						className="form-control"
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
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
					{images.length > 0
						? images.map((pic, index) => (
								<div key={index}>{pic.name}</div>
						  ))
						: null}
					<input type="file" name="images" onChange={handleImages} />
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
