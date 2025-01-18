import { DataTable } from "mantine-datatable";
import type {
	MantineDataTableColumnProps,
	MantineDataTableProps,
} from "../types";

export function MantineDataTable<T>({
	columns,
	api,
	leftColumn,
	rightColumn,
	...props
}: MantineDataTableProps<T>) {
	const { fetchFind } = api;
	const { page, setPage, sortStatus, setSortStatus } = fetchFind.helper;

	return (
		<DataTable<T>
			withTableBorder
			withColumnBorders
			striped
			highlightOnHover
			loaderType="oval"
			height={500}
			page={page}
			totalRecords={fetchFind.data?.meta.pagination.total ?? 0}
			recordsPerPage={fetchFind.data?.meta.pagination.pageSize ?? 25}
			onPageChange={setPage}
			fetching={fetchFind.isLoading || fetchFind.isPending}
			records={fetchFind.data?.data ?? []}
			columns={
				[leftColumn, ...columns, rightColumn].filter(
					(column) => column !== undefined,
				) as MantineDataTableColumnProps<T>[]
			}
			onSortStatusChange={setSortStatus}
			sortStatus={sortStatus}
			{...(({ customLoader, ...rest }) => rest)(props)}
		/>
	);
}
