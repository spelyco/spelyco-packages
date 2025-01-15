import type {
	ComboboxItem,
	ComboboxLikeRenderOptionInput,
	ComboboxParsedItem,
} from "@mantine/core";
import type { UseStrapiFindProps } from "../strapi/hooks/use-strapi-find";

export type SelectFindProps<T> = Omit<UseStrapiFindProps, "key"> & {
	queryKey: string[];
	data: (data: T) => ComboboxParsedItem;
};

export type SelectRenderOptionProps<T = Record<string, any>> =
	ComboboxLikeRenderOptionInput<ComboboxItem & { data?: T }>;
