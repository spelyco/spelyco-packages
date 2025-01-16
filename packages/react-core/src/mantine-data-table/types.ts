import type { DataTableColumn } from "mantine-datatable";
import type { UseStrapiCreateProps } from "../strapi/hooks/use-strapi-create";
import type { UseStrapiDeleteProps } from "../strapi/hooks/use-strapi-delete";
import type {
	UseStrapiFindProps,
	UseStrapiFindResult,
} from "../strapi/hooks/use-strapi-find";
import type { UseStrapiFindOneProps } from "../strapi/hooks/use-strapi-find-one";
import type { UseStrapiUpdateProps } from "../strapi/hooks/use-strapi-update";

type MantineDataTableColumnTypeProps =
	| "text"
	| "number"
	| "date"
	| "date-range"
	| "boolean"
	| "price-range"
	| "price";

export type FilterOperator =
	| "$eq"
	| "$ne"
	| "$lt"
	| "$lte"
	| "$gt"
	| "$gte"
	| "$contains"
	| "$notContains";

export type LogicalOperator = "$and" | "$or";

export interface MantineDataTableFilter {
	id: string;
	type: "string" | "number" | "date" | "boolean";
	field: string;
	operator: FilterOperator;
	value: unknown;
}

export interface MantineDataTableFilterGroup {
	id: string;
	logicalOperator: LogicalOperator;
	filters: MantineDataTableFilter[];
}

type ExtendDataTableColumn<T = Record<string, unknown>> =
	DataTableColumn<T> & {};

export type MantineDataTableColumnProps<T = Record<string, unknown>> =
	ExtendDataTableColumn<T>;

export type MantineDataTableConfigProps = {
	config?: {
		find?: Omit<UseStrapiFindProps, "axios" | "serviceName">;
		findOne?: Omit<UseStrapiFindOneProps, "axios" | "serviceName">;
		create?: Omit<UseStrapiCreateProps, "axios" | "serviceName">;
		update?: Omit<UseStrapiUpdateProps, "axios" | "serviceName">;
		delete?: Omit<UseStrapiDeleteProps, "axios" | "serviceName">;
	};
};

export type MantineDataTableProps<T> = {
	columns: MantineDataTableColumnProps<T>[];
	api: UseMantineDataTableResult<T>;
};

export type UseMantineDataTableProps = MantineDataTableConfigProps;

export type UseMantineDataTableResult<T> = {
	fetchFind: UseStrapiFindResult<T>;
};
