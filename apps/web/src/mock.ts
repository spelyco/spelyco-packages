import {
	MantineDataTable,
	type MantineDataTableColumnProps,
} from "@spelyco/react-core";

export const columnDefs: MantineDataTableColumnProps[] = [
	{
		accessor: "id",
		title: "#",
		sortable: false,
		width: 40,
		textAlign: "center",
		type: "number",
	},
	{
		accessor: "title",
		title: "Title",
		sortable: true,
		draggable: true,
		width: 300,
		type: "text",
	},
	{
		accessor: "description",
		title: "Description",
		sortable: true,
		draggable: true,
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
