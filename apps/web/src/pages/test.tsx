import { Button, Container, Text } from "@mantine/core";
import {
	MantineDataTable,
	type MantineDataTableColumnProps,
	type MantineDataTableProps,
	UsersMultiSelect,
	useMantineDataTable,
	useMantineDataTableSearchInput,
} from "@spelyco/react-core";
import { axiosInstance } from "../axios";

type Customer = {
	id: number;
	name: string;
};

const columnDefs: MantineDataTableColumnProps[] = [
	{
		accessor: "id",
		title: "ID",
		sortable: true,
		width: 50,
	},
	{
		accessor: "name",
		title: "Name",
		sortable: true,
	},
];

function TestPage() {
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
						dropdownLabel={<Text fw={"bold"}>In this view show records</Text>}
					/>
					<UsersMultiSelect axios={axiosInstance} />
					<Button>Ekle</Button>
				</MantineDataTable.Group>
				<MantineDataTable.Content {...mantineDataTableProps} />
			</MantineDataTable.Root>
		</Container>
	);
}

export { TestPage };
