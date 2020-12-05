import axios from "axios";
import { api } from "../urlConfig";

const exiosInstance = axios.create({
	baseURL: api,
	headers: {
		"Accept-Language": "id",
		// 'Authorization': ''
	},
});

export default exiosInstance;
