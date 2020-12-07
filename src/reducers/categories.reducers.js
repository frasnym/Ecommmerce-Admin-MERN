import { categoriesConstants } from "../actions/constants";

const initState = {
	categories: [],
	loading: false,
	error: null,
};

const buildNewCategories = (parentId, categories, category) => {
	let myCategories = [];

	if (parentId === undefined) {
		return [
			...categories,
			{
				_id: category._id,
				name: category.name,
				slug: category.slug,
				children: [],
			},
		];
	}

	for (const cat of categories) {
		if (cat._id === parentId) {
			myCategories.push({
				...cat,
				children: cat.children
					? buildNewCategories(
							parentId,
							[
								...cat.children,
								{
									_id: category._id,
									name: category.name,
									slug: category.slug,
									parentId: category.parentId,
									children: category.children,
								},
							],
							category
					  )
					: [],
			});
		} else {
			myCategories.push({
				...cat,
				children: cat.children
					? buildNewCategories(parentId, cat.children, category)
					: [],
			});
		}
	}

	return myCategories;
};

const categoriesReducers = (state = initState, action) => {
	switch (action.type) {
		case categoriesConstants.GET_ALL_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case categoriesConstants.GET_ALL_CATEGORIES_SUCCESS:
			state = {
				...state,
				categories: action.payload.categories,
				loading: false,
			};
			break;

		case categoriesConstants.ADD_NEW_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case categoriesConstants.ADD_NEW_CATEGORIES_SUCCESS:
			state = {
				...state,
				loading: false,
				categories: buildNewCategories(
					action.payload.category.parentId,
					state.categories,
					action.payload.category
				),
			};
			break;

		case categoriesConstants.ADD_NEW_CATEGORIES_FAILURE:
			state = {
				...initState,
			};
			break;

		default:
			break;
	}

	return state;
};

export default categoriesReducers;
