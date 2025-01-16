import {
	MantineDataTable,
	type MantineDataTableColumnProps,
} from "@spelyco/react-core";

export const columnDefs: MantineDataTableColumnProps[] = [
	{
		accessor: "id",
		title: "#",
		sortable: false,
		type: "number",
	},
	{
		accessor: "title",
		title: "Title",
		sortable: true,
		width: 300,
		type: "text",
	},
	{
		accessor: "description",
		title: "Description",
		sortable: true,
		ellipsis: true,
		type: "text",
	},
	{
		accessor: "createdAt",
		title: "Created At",
		sortable: true,
		type: "date",
		render: (record: Record<string, unknown>) =>
			MantineDataTable.Date({ value: record.createdAt as string | Date }),
	},
];
