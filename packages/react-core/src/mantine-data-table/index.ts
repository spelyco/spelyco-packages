// Components
import { MantineDataTable as BaseTable } from "./components/mantine-data-table";
import { MantineDataTableActionCopy } from "./components/mantine-data-table-action-copy";
import { MantineDataTableActionDelete } from "./components/mantine-data-table-action-delete";
import { MantineDataTableActionStatusDraft } from "./components/mantine-data-table-action-status-draft";
import { MantineDataTableActionStatusPublished } from "./components/mantine-data-table-action-status-published";
import { MantineDataTableColumnRowMenu } from "./components/mantine-data-table-column-row-menu";
import { MantineDataTableDate } from "./components/mantine-data-table-date";
import { MantineDataTableFilter } from "./components/mantine-data-table-filter";
import { MantineDataTableGroup } from "./components/mantine-data-table-group";
import { MantineDataTableRoot } from "./components/mantine-data-table-root";

// Create compound component
export const MantineDataTable = Object.assign(BaseTable, {
	Root: MantineDataTableRoot,
	Content: BaseTable,
	Group: MantineDataTableGroup,
	Filter: MantineDataTableFilter,
	Date: MantineDataTableDate,
	ActionDelete: MantineDataTableActionDelete,
	ActionCopy: MantineDataTableActionCopy,
	ActionStatusDraft: MantineDataTableActionStatusDraft,
	ActionStatusPublished: MantineDataTableActionStatusPublished,
	ColumnRowMenu: MantineDataTableColumnRowMenu,
});

// Hooks
export { useMantineDataTable } from "./hooks/use-mantine-data-table";
export { useMantineDataTableFilter } from "./hooks/use-mantine-data-table-filter";

// Types
export type {
	MantineDataTableColumnProps,
	MantineDataTableConfigProps,
	MantineDataTableFilterTypeProps,
	MantineDataTableProps,
	UseMantineDataTableProps,
	UseMantineDataTableResult,
} from "./types";
