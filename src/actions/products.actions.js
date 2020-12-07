import axios from "../helpers/axios";
import { productsConstants } from "./constants";

export const addProduct = (form) => {
	return async (dispatch) => {
		dispatch({
			type: productsConstants.ADD_NEW_PRODUCTS_REQUEST,
		});
		const res = await axios.post("/products", form);

		if (res.status === 201) {
			dispatch({
				type: productsConstants.ADD_NEW_PRODUCTS_SUCCESS,
				payload: { category: res.data.data },
			});
		} else {
			dispatch({
				type: productsConstants.ADD_NEW_PRODUCTS_FAILURE,
				payload: res.data.message,
			});
		}
	};
};
