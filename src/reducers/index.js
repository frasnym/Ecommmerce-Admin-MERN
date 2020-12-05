import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import productsReducers from "./products.reducers";
import categoriesReducers from "./categories.reducers";

const rootReducer = combineReducers({
	auth: authReducers,
	products: productsReducers,
	categories: categoriesReducers,
});

export default rootReducer;
