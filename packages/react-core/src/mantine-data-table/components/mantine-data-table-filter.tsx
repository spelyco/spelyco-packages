import {
	ActionIcon,
	type BoxProps,
	Button,
	type ButtonProps,
	CloseButton,
	Divider,
	Group,
	type GroupProps,
	Menu,
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
import { IconFilter, IconMinus, IconPlus } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useMantineDataTableFilter } from "../hooks/use-mantine-data-table-filter";
import type { MantineDataTableColumnProps } from "../types";

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
};

export function MantineDataTableFilter({
	columnDefs,
	button,
	label = "Filter",
	popover,
	dropdown,
	dropdownLabel,
	dropdownHeader,
	dropdownFooter,
	addFilterButton,
	addFilterButtonLabel = "Add filter",
	clearFilterButton,
	clearFilterButtonLabel = "Clear all filters",
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
	} = useMantineDataTableFilter({
		columnDefs,
	});

	console.log("filterGroups", filterGroups);

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
					leftSection={<IconFilter size={16} />}
					{...button}
				>
					{label}
				</Button>
			</Popover.Target>
			<Popover.Dropdown p={0} {...dropdown}>
				<Stack gap={0}>
					<>
						<Group p="xs" justify="space-between" {...dropdownHeader}>
							{dropdownLabel}
							<CloseButton onClick={close} />
						</Group>
						<Divider />
					</>
					<Stack px="xl" py={"sm"} gap={"xs"}>
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
													field: "name",
													type: "string",
													operator: "$eq",
													value: "",
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
												data={columnDefs.map((column) => ({
													value: column.accessor.toString(),
													label:
														column.title?.toString() ??
														column.accessor.toString(),
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
											/>
											<TextInput size="xs" flex={1} placeholder="Enter value" />
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
									{addFilterButtonLabel}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => addFilterGroup("$and")}>
									Match All (AND)
								</Menu.Item>
								<Menu.Item onClick={() => addFilterGroup("$or")}>
									Match Any (OR)
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Button
							variant="subtle"
							{...clearFilterButton}
							onClick={clearFilters}
						>
							{clearFilterButtonLabel}
						</Button>
					</Group>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}
