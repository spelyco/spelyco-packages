import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { strapiUpdate } from "../lib/strapi-update";
import type { UseStrapiBaseInterface } from "../types";

export type UseStrapiUpdateProps = Omit<
	UseStrapiBaseInterface,
	"documentId"
> & {
	queryOptions?: Omit<
		UseMutationOptions<
			unknown,
			Error,
			{ documentId: string; data: Record<string, unknown> },
			unknown
		>,
		"mutationKey" | "mutationFn"
	>;
};

export function useStrapiUpdate({
	axios,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiUpdateProps) {
	return useMutation({
		mutationKey: ["update", serviceName, ...(key ?? [])],
		mutationFn: async ({
			documentId,
			data,
		}: { documentId: string; data: Record<string, unknown> }) =>
			strapiUpdate(axios, serviceName, documentId, data, config),
		...queryOptions,
	});
}
