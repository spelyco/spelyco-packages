import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { StrapiSingleResponseInterface } from "../interfaces/strapi-single-response-interface";

export async function strapiUpdate<T>(
	axios: AxiosInstance,
	serviceName: string,
	id: string | number,
	data: Partial<T>,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axios.put<StrapiSingleResponseInterface<T>>(
		`/api/${serviceName}/${id}`,
		{ data },
		config,
	);
	return response.data.data;
}
