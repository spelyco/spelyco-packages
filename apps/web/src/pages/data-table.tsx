import { Button, Container, Group, Text } from "@mantine/core";
import {
	MantineDataTable,
	type MantineDataTableProps,
	useMantineDataTable,
	useMantineDataTableSearchInput,
} from "@spelyco/react-core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { axiosInstance } from "../axios";
import { columnDefs } from "../mock";

type Customer = {
	id: number;
	name: string;
};

function DataTablePage() {
	const { searchInputFilters } = useMantineDataTableSearchInput();
	const [filters, setFilters] = useState<Record<string, unknown>>({});
	const [selected, setSelected] = useState<Customer[]>([]);

	const api = useMantineDataTable<Customer>({
		serviceName: "articles",
		axios: axiosInstance,
		config: {
			find: {
				key: ["mantine-data-table", "customers", JSON.stringify(filters)],
				config: {
					params: {
						filters: {
							...searchInputFilters(),
							...filters,
						},
						pagination: {
							pageSize: 5,
						},
					},
				},
			},
		},
	});

	const mantineDataTableProps: MantineDataTableProps<Customer> = {
		columns: columnDefs,
		api,
		idAccessor: "id",
		selectedRecords: selected,
		onSelectedRecordsChange: (selected) => setSelected(selected),
	};

	return (
		<Container size={"xl"} mt={"xl"}>
			<MantineDataTable.Root>
				<MantineDataTable.Group justify={"space-between"}>
					<Group>
						<MantineDataTable.Filter
							columnDefs={columnDefs}
							button={{
								variant: "default",
							}}
							dropdownLabel={<Text fw={"bold"}>In this view show records</Text>}
							onConfirm={(filters) => setFilters(filters)}
						/>
						<MantineDataTable.Selected
							selected={selected}
							onChangeSelected={setSelected}
						/>
					</Group>
					<Button variant="default" leftSection={<IconPlus size={16} />}>
						Ekle
					</Button>
				</MantineDataTable.Group>
				<MantineDataTable.Content {...mantineDataTableProps} />
			</MantineDataTable.Root>
		</Container>
	);
}

export { DataTablePage };
