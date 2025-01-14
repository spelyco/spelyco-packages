import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { StrapiSingleResponseInterface } from "../interfaces/strapi-single-response-interface";

export async function strapiFindOne<T>(
	axios: AxiosInstance,
	serviceName: string,
	id: string | number,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axios.get<StrapiSingleResponseInterface<T>>(
		`/api/${serviceName}/${id}`,
		config,
	);
	return response.data.data;
}
