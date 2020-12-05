import { authConstants } from "../actions/constants";

const initState = {
	name: "Mico from Reducers",
};

const authReducers = (state = initState, action) => {
	console.log(action);

	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				...action.payload,
			};
			break;
		default:
			break;
	}
	return state;
};

export default authReducers;
