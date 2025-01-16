// Components
import { MantineDataTable as BaseTable } from "./components/mantine-data-table";
import { MantineDataTableDate } from "./components/mantine-data-table-date";
import { MantineDataTableFilter } from "./components/mantine-data-table-filter";
import { MantineDataTableGroup } from "./components/mantine-data-table-group";
import { MantineDataTableRoot } from "./components/mantine-data-table-root";
import { MantineDataTableSearchInput } from "./components/mantine-data-table-search-input";
import { MantineDataTableSelected } from "./components/mantine-data-table-selected";
// Create compound component
export const MantineDataTable = Object.assign(BaseTable, {
	Root: MantineDataTableRoot,
	Content: BaseTable,
	SearchInput: MantineDataTableSearchInput,
	Group: MantineDataTableGroup,
	Filter: MantineDataTableFilter,
	Date: MantineDataTableDate,
	Selected: MantineDataTableSelected,
});

// Hooks
export { useMantineDataTable } from "./hooks/use-mantine-data-table";
export { useMantineDataTableFilter } from "./hooks/use-mantine-data-table-filter";
export { useMantineDataTableSearchInput } from "./hooks/use-mantine-data-table-search-input";

// Types
export type {
	MantineDataTableColumnProps,
	MantineDataTableConfigProps,
	MantineDataTableFilterTypeProps,
	MantineDataTableProps,
	UseMantineDataTableProps,
	UseMantineDataTableResult,
} from "./types";
