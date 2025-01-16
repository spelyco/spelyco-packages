import { useDisclosure, useListState } from "@mantine/hooks";
import type {
	LogicalOperator,
	MantineDataTableColumnProps,
	MantineDataTableFilter,
	MantineDataTableFilterGroup,
} from "../types";

type MantineDataTableFilterProps = {
	columnDefs: MantineDataTableColumnProps[];
};

export function useMantineDataTableFilter({
	columnDefs,
}: MantineDataTableFilterProps) {
	const [opened, { open, close }] = useDisclosure();

	const [filterGroups, groupHandlers] =
		useListState<MantineDataTableFilterGroup>([]);

	const addFilterGroup = (logicalOperator: LogicalOperator): void => {
		groupHandlers.append({
			id: crypto.randomUUID(),
			logicalOperator,
			filters: [],
		});
	};

	const addFilter = (
		groupId: string,
		filter: Omit<MantineDataTableFilter, "id">,
	): void => {
		groupHandlers.setState((prevGroups) =>
			prevGroups.map((group) => {
				if (group.id === groupId) {
					return {
						...group,
						filters: [...group.filters, { ...filter, id: crypto.randomUUID() }],
					};
				}
				return group;
			}),
		);
	};

	const removeFilter = (groupId: string, filterId: string): void => {
		groupHandlers.setState(
			(prevGroups) =>
				prevGroups
					.map((group) => {
						if (group.id === groupId) {
							return {
								...group,
								filters: group.filters.filter((f) => f.id !== filterId),
							};
						}
						return group;
					})
					.filter((group) => group.filters.length > 0), // Remove empty groups
		);
	};

	const clearFilters = (): void => {
		groupHandlers.setState([]);
	};

	const getQueryParams = (): Record<string, unknown> => {
		return filterGroups.reduce(
			(acc, group) => {
				if (group.filters.length === 0) return acc;

				// If there's only one filter in the group, no need for logical operator
				if (group.filters.length === 1) {
					const filter = group.filters[0];
					acc[`filters[${filter.field}][${filter.operator}]`] = filter.value;
					return acc;
				}

				// Handle multiple filters with logical operators
				acc[group.logicalOperator] = group.filters.map((filter) => ({
					[filter.field]: { [filter.operator]: filter.value },
				}));

				return acc;
			},
			{} as Record<string, unknown>,
		);
	};

	return {
		filterGroups,
		addFilterGroup,
		addFilter,
		removeFilter,
		clearFilters,
		getQueryParams,
		opened,
		open,
		close,
	};
}
