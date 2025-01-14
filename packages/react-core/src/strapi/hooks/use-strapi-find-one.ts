import { useQuery } from "@tanstack/react-query";
import { strapiFindOne } from "../lib/strapi-find-one";
import type { UseStrapiBaseInterface } from "../types";

type UseStrapiFindOneProps = UseStrapiBaseInterface & {
	documentId: string;
};

export function useStrapiFindOne({
	axios,
	documentId,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiFindOneProps) {
	return useQuery({
		queryKey: ["find-one", serviceName, ...(key ?? [])],
		queryFn: async () => strapiFindOne(axios, serviceName, documentId, config),
		...queryOptions,
	});
}
