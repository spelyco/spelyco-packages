// Components
import { MantineDataTable as BaseTable } from "./components/mantine-data-table";
import { MantineDataTableFilter } from "./components/mantine-data-table-filter";
import { MantineDataTableGroup } from "./components/mantine-data-table-group";
import { MantineDataTableRoot } from "./components/mantine-data-table-root";
import { MantineDataTableSearchInput } from "./components/mantine-data-table-search-input";

// Create compound component
export const MantineDataTable = Object.assign(BaseTable, {
	Root: MantineDataTableRoot,
	Content: BaseTable,
	SearchInput: MantineDataTableSearchInput,
	Group: MantineDataTableGroup,
	Filter: MantineDataTableFilter,
});

// Hooks
export { useMantineDataTable } from "./hooks/use-mantine-data-table";
export { useMantineDataTableFilter } from "./hooks/use-mantine-data-table-filter";
export { useMantineDataTableSearchInput } from "./hooks/use-mantine-data-table-search-input";

// Types
export type {
	MantineDataTableColumnProps,
	MantineDataTableConfigProps,
	MantineDataTableProps,
	UseMantineDataTableProps,
	UseMantineDataTableResult,
} from "./types";
