import axios from "../helpers/axios";
import { categoriesConstants } from "./constants";

export const getAllCategories = () => {
	return async (dispatch) => {
		dispatch({
			type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST,
		});
		const res = await axios.get("categories");

		if (res.status === 200) {
			const { data: categories } = res.data;
			dispatch({
				type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
				payload: {
					categories,
				},
			});
		} else {
			dispatch({
				type: categoriesConstants.GET_ALL_CATEGORIES_FAILURE,
				payload: {
					error: res.message,
				},
			});
		}
	};
};
