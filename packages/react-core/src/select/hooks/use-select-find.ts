import { useStrapiFind } from "../../strapi";
import type { UseStrapiFindProps } from "../../strapi/hooks/use-strapi-find";

export function useSelectFind<T = Record<string, unknown>>(
	props: UseStrapiFindProps,
) {
	return useStrapiFind<T>(props);
}
