import axios from "../helpers/axios";
import { productsConstants } from "./constants";

export const getInitialData = () => {
	return async (dispatch) => {
		dispatch({
			type: productsConstants.GET_ALL_PRODUCTS_REQUEST,
		});
		const res = await axios.get("/products");

		if (res.status === 200) {
			dispatch({
				type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
				payload: {
					products: res.data.data,
				},
			});
		} else {
			dispatch({
				type: productsConstants.GET_ALL_PRODUCTS_FAILURE,
				payload: {
					error: res.data.message,
				},
			});
		}
	};
};
