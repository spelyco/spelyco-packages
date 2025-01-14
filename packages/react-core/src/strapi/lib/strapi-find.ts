import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { StrapiCollectionResponseInterface } from "../interfaces/strapi-collection-response-interface";
import type { StrapiMetaInterface } from "../interfaces/strapi-meta-interface";

export async function strapiFind<T>(
	axios: AxiosInstance,
	serviceName: string,
	config?: AxiosRequestConfig,
): Promise<{
	data: T[];
	meta: StrapiMetaInterface;
}> {
	const response = await axios.get<StrapiCollectionResponseInterface<T>>(
		`/api/${serviceName}`,
		config,
	);
	return response.data;
}
