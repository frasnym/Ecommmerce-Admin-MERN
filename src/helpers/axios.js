import axios from "axios";
import { api } from "../urlConfig";

const axiosInstance = axios.create();

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
	async (config) => {
		config.baseURL = api;
		config.headers = {
			"Accept-Language": "id",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		};
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default axiosInstance;
