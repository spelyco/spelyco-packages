import { DataTable } from "mantine-datatable";
import type { MantineDataTableProps } from "../types";

export function MantineDataTable<T>({
	columns,
	api,
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
			recordsPerPage={fetchFind.data?.meta.pagination.pageSize ?? 10}
			onPageChange={setPage}
			fetching={fetchFind.isLoading || fetchFind.isPending}
			records={fetchFind.data?.data ?? []}
			columns={columns}
			onSortStatusChange={setSortStatus}
			sortStatus={sortStatus}
			{...(({ customLoader, ...rest }) => rest)(props)}
		/>
	);
}
