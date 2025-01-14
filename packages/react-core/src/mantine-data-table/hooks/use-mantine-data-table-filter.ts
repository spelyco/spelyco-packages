import { useListState } from "@mantine/hooks";
import type {
	MantineDataTableColumnProps,
	MantineDataTableFilter,
} from "../types";

type MantineDataTableFilterProps = {
	columnDefs: MantineDataTableColumnProps[];
};

export function useMantineDataTableFilter({
	columnDefs,
}: MantineDataTableFilterProps) {
	const [filters, handlers] = useListState<MantineDataTableFilter>([]);

	const addFilter = (filter: MantineDataTableFilter): void => {
		handlers.append({
			...filter,
			id: crypto.randomUUID(),
		});
	};

	const removeFilter = (id: string): void => {
		handlers.filter((item) => item.id !== id);
	};

	const clearFilters = (): void => {
		handlers.setState([]);
	};

	const getQueryParams = (): Record<string, unknown> => {
		return filters.reduce(
			(acc, filter) => {
				acc[`filters[${filter.field}][${filter.operator}]`] = filter.value;
				return acc;
			},
			{} as Record<string, unknown>,
		);
	};

	return {
		filters,
		addFilter,
		removeFilter,
		clearFilters,
		getQueryParams,
	};
}
