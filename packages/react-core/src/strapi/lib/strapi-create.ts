import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { StrapiSingleResponseInterface } from "../interfaces/strapi-single-response-interface";

export async function strapiCreate<T>(
	axios: AxiosInstance,
	serviceName: string,
	data: Partial<T>,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axios.post<StrapiSingleResponseInterface<T>>(
		`/api/${serviceName}`,
		{ data },
		config,
	);
	return response.data.data;
}
