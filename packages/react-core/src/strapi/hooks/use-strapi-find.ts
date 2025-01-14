import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { strapiFind } from "../lib/strapi-find";

type UseStrapiFindProps = {
	axios: AxiosInstance;
	serviceName: string;
	config?: AxiosRequestConfig;
	key?: string[];
	queryOptions?: UseQueryOptions;
};

export function useStrapiFind({
	axios,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiFindProps) {
	return useQuery({
		queryKey: ["find", serviceName, ...(key ?? [])],
		queryFn: async () => strapiFind(axios, serviceName, config),
		...queryOptions,
	});
}
