import { Button, Group, Text } from "@mantine/core";
import {
	MantineDataTable,
	type MantineDataTableProps,
	useMantineDataTable,
} from "@spelyco/react-core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { axiosInstance } from "../axios";
import { columnDefs } from "../mock";

type Customer = {
	id: number;
	documentId: string;
	name: string;
};

function DataTablePage() {
	const [filters, setFilters] = useState<Record<string, unknown>>({});
	const [selected, setSelected] = useState<Customer[]>([]);

	const { handleDeleteItemWithModal, ...api } = useMantineDataTable<Customer>({
		serviceName: "articles",
		axios: axiosInstance,
		config: {
			find: {
				key: ["mantine-data-table", "customers", JSON.stringify(filters)],
				config: {
					params: {
						filters,
					},
				},
			},
		},
	});

	const mantineDataTableProps: MantineDataTableProps<Customer> = {
		columns: columnDefs,
		api,
		idAccessor: "id",
		// selectedRecords: selected,
		// onSelectedRecordsChange: (selected) => setSelected(selected),
		leftColumn: {
			accessor: "",
			title: "",
			sortable: false,
			type: "text",
			render: ({ documentId }) => (
				<MantineDataTable.ColumnRowMenu
					items={[
						{
							leftSection: <IconTrash size={14} />,
							children: "Delete Article",
							color: "red",
							onClick: () => {
								handleDeleteItemWithModal(documentId, {
									title: "Delete item",
									message: "Are you sure you want to delete this item?",
									confirmLabel: "Delete",
									cancelLabel: "Cancel",
									onSuccess: () => {
										console.log("success");
									},
									onError: () => {},
								});
							},
						},
					]}
				/>
			),
		},
	};

	return (
		<MantineDataTable.Root>
			<MantineDataTable.Group justify={"space-between"}>
				<Group>
					<MantineDataTable.Filter
						columnDefs={columnDefs}
						dropdownLabel={<Text fw={"bold"}>In this view show records</Text>}
						onConfirm={(filters) => setFilters(filters)}
					/>
					{selected.length > 0 && (
						<Group gap={5}>
							{/* <MantineDataTable.ActionDelete
								selected={selected}
								onChangeSelected={setSelected}
								variant="outline"
							/> */}
							{/* <MantineDataTable.ActionCopy
								selected={selected}
								onChangeSelected={setSelected}
								axios={axiosInstance}
								serviceName="articles"
							/>
							<MantineDataTable.ActionStatusDraft
								selected={selected}
								onChangeSelected={setSelected}
								variant="default"
							/>
							<MantineDataTable.ActionStatusPublished
								selected={selected}
								onChangeSelected={setSelected}
								variant="default"
							/> */}
						</Group>
					)}
				</Group>
				<Button variant="default" leftSection={<IconPlus size={16} />}>
					Ekle
				</Button>
			</MantineDataTable.Group>
			<MantineDataTable.Content {...mantineDataTableProps} />
		</MantineDataTable.Root>
	);
}

export { DataTablePage };
