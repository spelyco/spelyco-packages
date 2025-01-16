import type { MantineDataTableColumnProps } from "@spelyco/react-core";

export const columnDefs: MantineDataTableColumnProps[] = [
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
