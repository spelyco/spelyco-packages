import { Button, Container, Text } from "@mantine/core";
import {
	MantineDataTable,
	type MantineDataTableProps,
	useMantineDataTable,
	useMantineDataTableSearchInput,
} from "@spelyco/react-core";
import { IconPlus } from "@tabler/icons-react";
import { axiosInstance } from "../axios";
import { columnDefs } from "../modules/data-table/mock";

type Customer = {
	id: number;
	name: string;
};

function DataTablePage() {
	const { searchInputFilters } = useMantineDataTableSearchInput();

	const api = useMantineDataTable<Customer>({
		serviceName: "customers",
		axios: axiosInstance,
		config: {
			find: {
				key: ["mantine-data-table", "customers"],
				config: {
					params: {
						filters: {
							...searchInputFilters(),
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
	};

	return (
		<Container size={"xl"} mt={"xl"}>
			<MantineDataTable.Root>
				<MantineDataTable.Group justify={"space-between"}>
					<MantineDataTable.Filter
						columnDefs={columnDefs}
						button={{
							variant: "default",
						}}
						dropdownLabel={<Text fw={"bold"}>In this view show records</Text>}
					/>
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
