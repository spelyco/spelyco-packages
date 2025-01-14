import type { AxiosInstance, AxiosRequestConfig } from "axios";

export async function strapiFind<T>(
	axios: AxiosInstance,
	serviceName: string,
	config?: AxiosRequestConfig,
) {
	const response = await axios.get<T>(`/api/${serviceName}`, config);
	return response.data;
}
