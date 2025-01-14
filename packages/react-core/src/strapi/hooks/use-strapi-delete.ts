import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { strapiDelete } from "../lib/strapi-delete";
import type { UseStrapiBaseInterface } from "../types";

export type UseStrapiDeleteProps = Omit<
	UseStrapiBaseInterface,
	"documentId"
> & {
	queryOptions?: Omit<
		UseMutationOptions<unknown, Error, string, unknown>,
		"mutationKey" | "mutationFn"
	>;
};

export function useStrapiDelete({
	axios,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiDeleteProps) {
	return useMutation({
		mutationKey: ["delete", serviceName, ...(key ?? [])],
		mutationFn: async (documentId: string) =>
			strapiDelete(axios, serviceName, documentId, config),
		...queryOptions,
	});
}
