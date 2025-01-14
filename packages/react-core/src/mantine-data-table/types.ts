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

export type MantineDataTableFilterOperator =
	| "$eq"
	| "$eqi"
	| "$ne"
	| "$nei"
	| "$lt"
	| "$lte"
	| "$gt"
	| "$gte"
	| "$in"
	| "$notIn"
	| "$contains"
	| "$notContains"
	| "$containsi"
	| "$notContainsi"
	| "$null"
	| "$notNull"
	| "$between"
	| "$startsWith"
	| "$startsWithi"
	| "$endsWith"
	| "$endsWithi"
	| "$or"
	| "$and"
	| "$not";

export type MantineDataTableFilter = {
	id: string;
	field: string;
	operator: MantineDataTableFilterOperator;
	type: MantineDataTableColumnTypeProps;
	value: string | number | boolean | string[] | number[] | boolean[];
};

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
