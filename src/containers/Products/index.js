import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./style.css";

export default function Products() {
	const [show, setShow] = useState(false);
	const [productDetailModal, setProductDetailModal] = useState(false);
	const [productDetail, setProductDetail] = useState(null);

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
	const product = useSelector((state) => state.products);
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

	const renderProducts = () => {
		return (
			<Table style={{ fontSize: 12 }} responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length > 0
						? product.products.map((product, index) => (
								<tr
									onClick={() =>
										showProductDetailModal(product)
									}
									key={product._id}
								>
									<td>{index + 1}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>{product.category.name}</td>
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
		);
	};

	const rendedAddProductModal = () => {
		return (
			<Modal
				show={show}
				handleClose={handleClose}
				modalTitle={"Add New Products"}
			>
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
					{createCategoryList(category.categories).map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						);
					})}
				</select>
				{images.length > 0
					? images.map((pic, index) => (
							<div key={index}>{pic.name}</div>
					  ))
					: null}
				<input type="file" name="images" onChange={handleImages} />
			</Modal>
		);
	};

	const showProductDetailModal = (product) => {
		setProductDetail(product);
		setProductDetailModal(true);
	};
	const renderProductDetailModal = () => {
		if (!productDetail) {
			return null;
		}
		return (
			<Modal
				show={productDetailModal}
				handleClose={() => setProductDetailModal(false)}
				modalTitle={"Product Detail"}
				size="lg"
			>
				<Row>
					<Col md="6">
						<label className="key">Name</label>
						<p className="value">{productDetail.name}</p>
					</Col>
					<Col md="6">
						<label className="key">Price</label>
						<p className="value">{productDetail.price}</p>
					</Col>
					<Col md="6">
						<label className="key">Quantity</label>
						<p className="value">{productDetail.quantity}</p>
					</Col>
					<Col md="6">
						<label className="key">Category</label>
						<p className="value">{productDetail.category.name}</p>
					</Col>
					<Col md="12">
						<label className="key">Description</label>
						<p className="value">{productDetail.description}</p>
					</Col>
					<Col>
						<label className="key">Images</label>
						<p className="value">
							{productDetail.images.map((image) => {
								return (
									<img
										src={image.full_url}
										alt={product._id}
									/>
								);
							})}
						</p>
					</Col>
				</Row>
			</Modal>
		);
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
				<Row>
					<Col>{renderProducts()}</Col>
				</Row>
			</Container>
			{rendedAddProductModal()}
			{renderProductDetailModal()}
		</Layout>
	);
}
