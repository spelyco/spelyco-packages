import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_TEST_API_URL ?? "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export { axiosInstance };
