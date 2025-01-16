import type {
	ComboboxItem,
	ComboboxLikeRenderOptionInput,
	ComboboxParsedItem,
	MultiSelectProps as MantineMultiSelectProps,
	SelectProps as MantineSelectProps,
} from "@mantine/core";
import type { UseStrapiFindProps } from "../strapi/hooks/use-strapi-find";

export type SelectFindProps<T> = Omit<UseStrapiFindProps, "key"> & {
	queryKey: string[];
	data: (data: T) => ComboboxParsedItem;
};

export type SelectRenderOptionProps<T = Record<string, unknown>> =
	ComboboxLikeRenderOptionInput<ComboboxItem & { data?: T }>;

// OutProject
export type MultiSelectProps<T> = Omit<MantineMultiSelectProps, "data"> &
	SelectFindProps<T>;

// OutProject
export type SelectProps<T> = Omit<MantineSelectProps, "data"> &
	SelectFindProps<T>;
