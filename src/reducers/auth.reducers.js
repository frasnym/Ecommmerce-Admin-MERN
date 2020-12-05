import { authConstants } from "../actions/constants";

const initState = {
	token: null,
	user: {
		full_name: "",
		email_address: "",
		phone_number: "",
	},
	authenticate: false,
	authenticating: false,
	loading: false,
	error: null,
	message: "",
};

const authReducers = (state = initState, action) => {
	console.log(action);

	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				authenticating: true,
				loading: true,
			};
			break;
		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
				loading: false,
			};
			break;
		case authConstants.LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initState,
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
			break;
		default:
			break;
	}
	return state;
};

export default authReducers;
