import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
	IoIosSquareOutline,
	IoIosCheckboxOutline,
	IoIosCheckbox,
	IoMdArrowDropright,
	IoMdArrowDropdown,
} from "react-icons/io";

import { addCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

export default function Categories() {
	const category = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	const [name, setName] = useState();
	const [image, setImage] = useState();
	const [parentId, setParentId] = useState();
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);

	// Update Categories
	const [updatecategoryModal, setUpdatecategoryModal] = useState(false);
	const updatecategory = () => {
		setUpdatecategoryModal(true);

		const categories = createCategoryList(category.categories);
		const expandedArray = [];
		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId === category.value
				);
				category && expandedArray.push(category);
			});
		const checkedArray = [];
		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId === category.value
				);
				category && checkedArray.push(category);
			});

		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
		console.log({ checkedArray, expandedArray });
	};
	const hanedleCategoriesInput = (key, value, index, type) => {
		if (type === "checked") {
			const updatedCheckedArray = checkedArray.map((item, _index) =>
				index === _index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedCheckedArray);
		} else if (type === "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				index === _index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedExpandedArray);
		}
	};

	// Create Category
	const [show, setShow] = useState(false);
	const handleClose = () => {
		const form = new FormData();

		if (name) form.append("name", name);
		if (parentId) form.append("parentId", parentId);
		form.append("imageUrl", image);
		dispatch(addCategory(form));

		setName("");
		setParentId("");

		setShow(false);
	};
	const handleShow = () => setShow(true);
	// Create Category - Push Image
	const handleCategoryImage = (e) => {
		setImage(e.target.files[0]);
	};

	// Render Category
	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 &&
					renderCategories(category.children),
			});
		}

		return myCategories;
	};
	const createCategoryList = (categories, options = []) => {
		for (const category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}

		return options;
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
						{/* <ul>{renderCategories(category.categories)}</ul> */}
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <IoIosCheckbox />,
								uncheck: <IoIosSquareOutline />,
								halfCheck: <IoIosCheckboxOutline />,
								expandClose: <IoMdArrowDropright />,
								expandOpen: <IoMdArrowDropdown />,
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<button>Delete</button>
						<button onClick={updatecategory}>Update</button>
					</Col>
				</Row>
			</Container>

			{/* Edit Category */}
			<Modal
				show={updatecategoryModal}
				handleClose={() => setUpdatecategoryModal(false)}
				modalTitle={"Update Categories"}
				size="lg"
			>
				<Row>
					<Col>
						<h6>Expanded</h6>
					</Col>
				</Row>
				<Row>
					{expandedArray.length > 0 &&
						expandedArray.map((item, index) => {
							return (
								<Row key={index}>
									<Col>
										<Input
											type="text"
											placeholder="Enter name"
											value={item.name}
											onChange={(e) =>
												hanedleCategoriesInput(
													"name",
													e.target.value,
													index,
													"expanded"
												)
											}
										/>
									</Col>
									<Col>
										<select
											className="form-control"
											value={item.parentId}
											onChange={(e) =>
												hanedleCategoriesInput(
													"parentId",
													e.target.value,
													index,
													"expanded"
												)
											}
										>
											<option>select a category</option>
											{createCategoryList(
												category.categories
											).map((option) => {
												return (
													<option
														key={option.value}
														value={option.value}
													>
														{option.name}
													</option>
												);
											})}
										</select>
									</Col>
									<Col>
										<select
											className="form-control"
											// value={}
											// onChange={(e) => setParentId(e.target.value)}
										>
											<option value="">
												select a type
											</option>
											<option value="store">Store</option>
											<option value="product">
												Product
											</option>
											<option value="page">Page</option>
										</select>
									</Col>
								</Row>
							);
						})}
				</Row>
				<Row>
					<Col>
						<h6>Checked</h6>
					</Col>
				</Row>
				<Row>
					{checkedArray.length > 0 &&
						checkedArray.map((item, index) => {
							return (
								<Row key={index}>
									<Col>
										<Input
											type="text"
											placeholder="Enter name"
											value={item.name}
											onChange={(e) =>
												hanedleCategoriesInput(
													"name",
													e.target.value,
													index,
													"checked"
												)
											}
										/>
									</Col>
									<Col>
										<select
											className="form-control"
											value={item.parentId}
											onChange={(e) =>
												hanedleCategoriesInput(
													"parentId",
													e.target.value,
													index,
													"checked"
												)
											}
										>
											<option>select a category</option>
											{createCategoryList(
												category.categories
											).map((option) => {
												return (
													<option
														key={option.value}
														value={option.value}
													>
														{option.name}
													</option>
												);
											})}
										</select>
									</Col>
									<Col>
										<select
											className="form-control"
											// value={}
											// onChange={(e) => setParentId(e.target.value)}
										>
											<option value="">
												select a type
											</option>
											<option value="store">Store</option>
											<option value="product">
												Product
											</option>
											<option value="page">Page</option>
										</select>
									</Col>
								</Row>
							);
						})}
				</Row>
			</Modal>

			{/* New Category */}
			<Modal
				show={show}
				handleClose={handleClose}
				modalTitle={"Add New Category"}
			>
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
					{createCategoryList(category.categories).map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						);
					})}
				</select>
				<input
					type="file"
					name="image"
					onChange={handleCategoryImage}
				/>
			</Modal>
		</Layout>
	);
}
