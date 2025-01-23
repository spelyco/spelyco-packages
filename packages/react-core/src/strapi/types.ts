import type { UseQueryOptions } from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export type UseStrapiBaseInterface = {
	axios: AxiosInstance;
	serviceName: string;
	config?: AxiosRequestConfig;
	key: string[];
	queryOptions?: UseQueryOptions;
};
