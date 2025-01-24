import { DataTable, useDataTableColumns } from "mantine-datatable";
import type {
	MantineDataTableColumnProps,
	MantineDataTableProps,
} from "../types";
import { uniqueId } from "lodash";
import { useMemo, useCallback } from "react";

export function MantineDataTable<T>({
	columns,
	api,
	leftColumn,
	rightColumn,
	customLoader,
	...props
}: MantineDataTableProps<T>) {
	const { fetchFind } = api;
	const { page, setPage, sortStatus, setSortStatus } = fetchFind.helper;

	// Memoize the effective columns to prevent unnecessary recalculations
	const { effectiveColumns } = useDataTableColumns<T>({
		key: props.storeColumnsKey ?? uniqueId(),
		columns: [leftColumn, ...columns, rightColumn].filter(
			(column) => column !== undefined,
		) as MantineDataTableColumnProps<T>[],
	});

	// Memoize pagination values
	const totalRecords = useMemo(
		() => fetchFind.data?.meta.pagination.total ?? 0,
		[fetchFind.data?.meta.pagination.total],
	);

	const recordsPerPage = useMemo(
		() => fetchFind.data?.meta.pagination.pageSize ?? 25,
		[fetchFind.data?.meta.pagination.pageSize],
	);

	// Memoize records
	const records = useMemo(
		() => fetchFind.data?.data ?? [],
		[fetchFind.data?.data],
	);

	// Memoize loading state
	const isFetching = useMemo(
		() => fetchFind.isLoading || fetchFind.isPending,
		[fetchFind.isLoading, fetchFind.isPending],
	);

	// Memoize page change handler
	const handlePageChange = useCallback(
		(newPage: number) => {
			setPage(newPage);
		},
		[setPage],
	);

	// Memoize sort status change handler
	const handleSortStatusChange = useCallback(
		(newSortStatus: any) => {
			setSortStatus(newSortStatus);
		},
		[setSortStatus],
	);

	return (
		<DataTable<T>
			withTableBorder
			withColumnBorders
			striped
			loaderType="oval"
			page={page}
			totalRecords={totalRecords}
			recordsPerPage={recordsPerPage}
			onPageChange={handlePageChange}
			fetching={isFetching}
			records={records}
			columns={effectiveColumns}
			onSortStatusChange={handleSortStatusChange}
			sortStatus={sortStatus}
			{...props}
		/>
	);
}
