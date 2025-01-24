import {
	ActionIcon,
	Badge,
	type BoxProps,
	Button,
	type ButtonProps,
	CloseButton,
	Divider,
	Group,
	type GroupProps,
	Menu,
	NumberInput,
	Paper,
	Popover,
	type PopoverDropdownProps,
	type PopoverProps,
	Select,
	Stack,
	Text,
	TextInput,
	rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconMenu3, IconMinus, IconPlus } from "@tabler/icons-react";
import { useCallback, useMemo, type ReactNode } from "react";
import { useMantineDataTableFilter } from "../hooks/use-mantine-data-table-filter";
import type {
	FilterOperator,
	MantineDataTableColumnProps,
	MantineDataTableFilterGroup,
	MantineDataTableFilterTypeProps,
} from "../types";

type MantineDataTableFilterProps = {
	columnDefs: MantineDataTableColumnProps[];
	button?: ButtonProps;
	label?: string;
	popover?: PopoverProps;
	dropdown?: PopoverDropdownProps;
	dropdownLabel?: ReactNode;
	dropdownHeader?: BoxProps;
	dropdownFooter?: GroupProps;
	addFilterButton?: ButtonProps;
	addFilterButtonLabel?: string;
	clearFilterButton?: ButtonProps;
	clearFilterButtonLabel?: string;
	dictionary?: {
		buttonLabel: string;
		headerLabel: string;
		footerLabel: string;
		addFilterButtonLabel: string;
		clearFilterButtonLabel: string;
		noFiltersAppliedLabel: string;
		matchAllLabel: string;
		matchAnyLabel: string;
		selectColumnLabel: string;
		selectOperatorLabel: string;
	};
	onConfirm?: (filter: Record<string, unknown>) => void;
};

export function MantineDataTableFilter({
	columnDefs,
	button,
	popover,
	dropdown,
	dropdownLabel,
	dropdownHeader,
	dropdownFooter,
	addFilterButton,
	dictionary,
	clearFilterButton,
	onConfirm,
}: MantineDataTableFilterProps) {
	const {
		filterGroups,
		addFilterGroup,
		addFilter,
		clearFilters,
		close,
		open,
		opened,
		removeFilter,
		updateFilter,
		getQueryParams,
	} = useMantineDataTableFilter();

	// Memoize operators data
	const operatorsData = useMemo(
		() => [
			{ value: "$eq", label: "Equals" },
			{ value: "$ne", label: "Not Equals" },
			{ value: "$lt", label: "Less Than" },
			{ value: "$lte", label: "Less Than or Equal To" },
			{ value: "$gt", label: "Greater Than" },
			{ value: "$gte", label: "Greater Than or Equal To" },
			{ value: "$contains", label: "Contains" },
			{ value: "$notContains", label: "Does Not Contain" },
		],
		[],
	);

	// Memoize the type component function
	const mantineDataTableTypeComponent = useCallback(
		(
			group: MantineDataTableFilterGroup,
			filter: MantineDataTableFilterTypeProps,
		) => {
			const defaultProps = {
				size: "xs",
				flex: 1,
			};

			switch (filter.type) {
				case "number":
					return (
						<NumberInput
							{...defaultProps}
							value={(filter.value as string) ?? ""}
							onChange={(value) => {
								updateFilter(group.id, filter.id, {
									value: value ?? "",
									type: filter.type,
									field: filter.field,
									operator: filter.operator,
								});
							}}
						/>
					);
				case "date":
					return (
						<DateInput
							size="xs"
							flex={1}
							value={filter.value ? new Date(filter.value as string) : null}
							onChange={(value) => {
								updateFilter(group.id, filter.id, {
									value: value?.toISOString() ?? "",
									type: filter.type,
									field: filter.field,
									operator: filter.operator,
								});
							}}
						/>
					);
				default:
					return (
						<TextInput
							{...defaultProps}
							value={(filter.value as string) ?? ""}
							onChange={(e) => {
								updateFilter(group.id, filter.id, {
									value: e.currentTarget.value,
									type: filter.type,
									field: filter.field,
									operator: filter.operator,
								});
							}}
						/>
					);
			}
		},
		[updateFilter],
	);

	// Memoize handlers
	const handleCloseConfirm = useCallback(() => {
		onConfirm?.(getQueryParams());
		close();
	}, [onConfirm, getQueryParams, close]);

	const handleColumnChange = useCallback(
		(groupId: string, filterId: string, value: string) => {
			const findColumn = columnDefs.find((column) => column.accessor === value);
			updateFilter(groupId, filterId, {
				field: value,
				type: findColumn?.type ?? "text",
				operator: "$eq",
				value: null,
			});
		},
		[columnDefs, updateFilter],
	);

	return (
		<Popover
			opened={opened}
			onChange={close}
			position="bottom-start"
			withOverlay
			shadow="sm"
			withinPortal
			closeOnClickOutside={false}
			trapFocus={false}
			overlayProps={{
				blur: 2,
			}}
			width={rem("50%")}
			{...popover}
		>
			<Popover.Target>
				<Button
					onClick={open}
					leftSection={<IconMenu3 size={16} />}
					rightSection={
						filterGroups.length > 0 && (
							<Badge size="xs" circle>
								{filterGroups.length}
							</Badge>
						)
					}
					{...button}
				>
					{dictionary?.buttonLabel ?? "Filter"}
				</Button>
			</Popover.Target>
			<Popover.Dropdown p={0} {...dropdown}>
				<Stack gap={0}>
					<>
						<Group p="xs" justify="space-between" {...dropdownHeader}>
							{dropdownLabel}
							<CloseButton
								onClick={() => {
									onConfirm?.(getQueryParams());
									close();
								}}
							/>
						</Group>
						<Divider />
					</>
					<Stack px="xl" py={"sm"} gap={"xs"}>
						{!filterGroups.length && (
							<Text size="sm" c="dimmed">
								{dictionary?.noFiltersAppliedLabel ?? "No filters applied"}
							</Text>
						)}
						{filterGroups.map((group) => (
							<Paper key={group.id} withBorder p={"sm"}>
								<Stack gap="xs">
									<Group justify="space-between">
										<Text size="sm" fw={"bold"}>
											{group.logicalOperator === "$and"
												? "Match All"
												: "Match Any"}
										</Text>
										<ActionIcon
											size={"sm"}
											variant="white"
											onClick={() =>
												addFilter(group.id, {
													field: "id",
													type: "number",
													operator: "$eq",
													value: null,
												})
											}
										>
											<IconPlus size={16} />
										</ActionIcon>
									</Group>
									{group.filters.length > 0 && <Divider />}
									{group.filters.map((filter) => (
										<Group key={filter.id}>
											<Select
												size="xs"
												flex={1}
												placeholder="Select column"
												value={filter.field}
												onChange={(value) => {
													if (value) {
														const findColumn = columnDefs.find(
															(column) => column.accessor === value,
														);
														updateFilter(group.id, filter.id, {
															field: value,
															type: findColumn?.type ?? "text",
															operator: "$eq",
															value: null,
														});
													}
												}}
												data={columnDefs.map((column) => ({
													value: column.accessor.toString(),
													label:
														column.title?.toString() ??
														column.accessor.toString(),
													type: column.type,
												}))}
											/>
											<Select
												size="xs"
												flex={1}
												placeholder="Select operator"
												data={[
													{
														value: "$eq",
														label: "Equals",
													},
													{
														value: "$ne",
														label: "Not Equals",
													},
													{
														value: "$lt",
														label: "Less Than",
													},
													{
														value: "$lte",
														label: "Less Than or Equal To",
													},
													{
														value: "$gt",
														label: "Greater Than",
													},
													{
														value: "$gte",
														label: "Greater Than or Equal To",
													},
													{
														value: "$contains",
														label: "Contains",
													},
													{
														value: "$notContains",
														label: "Does Not Contain",
													},
												]}
												value={filter.operator}
												onChange={(value) => {
													if (value) {
														updateFilter(group.id, filter.id, {
															operator: value as FilterOperator,
															type: filter.type,
															field: filter.field,
															value: filter.value,
														});
													}
												}}
											/>
											{mantineDataTableTypeComponent(group, filter)}
											<ActionIcon
												size={"sm"}
												variant="white"
												onClick={() => removeFilter(group.id, filter.id)}
											>
												<IconMinus size={16} />
											</ActionIcon>
										</Group>
									))}
								</Stack>
							</Paper>
						))}
					</Stack>
					<Divider />
					<Group justify="space-between" p="xs" {...dropdownFooter}>
						<Menu withinPortal>
							<Menu.Target>
								<Button
									type="button"
									variant="subtle"
									leftSection={<IconPlus size={16} />}
									{...addFilterButton}
								>
									{dictionary?.addFilterButtonLabel ?? "Add filter"}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => addFilterGroup("$and")}>
									{dictionary?.matchAllLabel ?? "Match All (AND)"}
								</Menu.Item>
								<Menu.Item onClick={() => addFilterGroup("$or")}>
									{dictionary?.matchAnyLabel ?? "Match Any (OR)"}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Button
							variant="subtle"
							{...clearFilterButton}
							onClick={clearFilters}
						>
							{dictionary?.clearFilterButtonLabel ?? "Clear all filters"}
						</Button>
					</Group>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}
