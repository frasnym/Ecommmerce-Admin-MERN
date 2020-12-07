import { productsConstants } from "../actions/constants";

const initState = {
	products: [],
	loading: false,
	error: null,
};

const productsReducers = (state = initState, action) => {
	switch (action.type) {
		case productsConstants.GET_ALL_PRODUCTS_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case productsConstants.GET_ALL_PRODUCTS_SUCCESS:
			state = {
				...state,
				loading: false,
				products: action.payload.products,
			};
			break;

		case productsConstants.GET_ALL_PRODUCTS_FAILURE:
			state = {
				...state,
				loading: true,
			};
			break;

		default:
			break;
	}

	return state;
};

export default productsReducers;
