import {
	Box,
	type BoxProps,
	Button,
	type ButtonProps,
	Divider,
	Group,
	type GroupProps,
	Popover,
	type PopoverDropdownProps,
	type PopoverProps,
	Stack,
	Text,
	rem,
} from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
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
	const { filters, addFilter, clearFilters } = useMantineDataTableFilter({
		columnDefs,
	});

	return (
		<Popover
			position="bottom-start"
			withOverlay
			shadow="sm"
			overlayProps={{
				blur: 2,
			}}
			width={rem("50%")}
			{...popover}
		>
			<Popover.Target>
				<Button leftSection={<IconFilter size={16} />} {...button}>
					{label}
				</Button>
			</Popover.Target>
			<Popover.Dropdown p={0} {...dropdown}>
				<Stack gap={0}>
					{dropdownLabel && (
						<>
							<Box p={"xs"} {...dropdownHeader}>
								{dropdownLabel}
							</Box>
							<Divider />
						</>
					)}
					<Box p={"xl"}>
						<Text>Filtre</Text>
					</Box>
					<Divider />
					<Group justify="space-between" p={"xs"} {...dropdownFooter}>
						<Button
							variant="subtle"
							leftSection={<IconPlus size={16} />}
							{...addFilterButton}
							onClick={() => {
								// addFilter({
								// 	field: "id",
								// 	operator: "$eq",
								// 	type: "string",
								// 	value: "1",
								// });
							}}
						>
							{addFilterButtonLabel}
						</Button>
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
