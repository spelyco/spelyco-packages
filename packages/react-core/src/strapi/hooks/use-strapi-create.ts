import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { strapiCreate } from "../lib/strapi-create";
import type { UseStrapiBaseInterface } from "../types";

export type UseStrapiCreateProps = Omit<
	UseStrapiBaseInterface,
	"documentId"
> & {
	queryOptions?: Omit<
		UseMutationOptions<
			unknown,
			Error,
			{ data: Record<string, unknown> },
			unknown
		>,
		"mutationKey" | "mutationFn"
	>;
};

export function useStrapiCreate({
	axios,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiCreateProps) {
	return useMutation({
		mutationKey: ["create", serviceName, ...(key ?? [])],
		mutationFn: async ({ data }: { data: Record<string, unknown> }) =>
			strapiCreate(axios, serviceName, data, config),
		...queryOptions,
	});
}
