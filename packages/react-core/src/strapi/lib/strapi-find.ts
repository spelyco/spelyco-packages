import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { StrapiCollectionResponseInterface } from "../interfaces/strapi-collection-response-interface";

export async function strapiFind<T>(
	axios: AxiosInstance,
	serviceName: string,
	config?: AxiosRequestConfig,
) {
	const response = await axios.get<StrapiCollectionResponseInterface<T>>(
		`/api/${serviceName}`,
		config,
	);
	return response.data;
}
