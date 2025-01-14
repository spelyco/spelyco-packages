import { Container } from "@mantine/core";
import {
	MantineDataTable,
	type MantineDataTableProps,
	useMantineDataTable,
} from "@spelyco/react-core";
import { axiosInstance } from "../axios";

type Customer = {
	id: number;
	name: string;
};

function TestPage() {
	const columnDefs = [
		{
			accessor: "id",
			title: "ID",
			sortable: true,
		},
		{
			accessor: "name",
			title: "Name",
			sortable: true,
		},
	];

	const api = useMantineDataTable<Customer>({
		serviceName: "customers",
		axios: axiosInstance,
		config: {
			find: {
				config: {
					params: {
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
		<Container mt={"xl"}>
			<MantineDataTable {...mantineDataTableProps} />
		</Container>
	);
}

export { TestPage };
