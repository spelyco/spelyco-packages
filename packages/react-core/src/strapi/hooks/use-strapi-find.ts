import {
	type QueryKey,
	type UseQueryOptions,
	type UseQueryResult,
	useQuery,
} from "@tanstack/react-query";
import type { DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import type { StrapiCollectionResponseInterface } from "../interfaces/strapi-collection-response-interface";
import { strapiFind } from "../lib/strapi-find";
import type { UseStrapiBaseInterface } from "../types";

export type UseStrapiFindProps = UseStrapiBaseInterface;

export type UseStrapiFindResult<T> = UseQueryResult<
	StrapiCollectionResponseInterface<T>,
	Error
> & {
	helper: {
		page: number;
		setPage: (page: number) => void;
		sortStatus: DataTableSortStatus<T>;
		setSortStatus: (sortStatus: DataTableSortStatus<T>) => void;
	};
};

export function useStrapiFind<T>({
	axios,
	key,
	serviceName,
	config,
	queryOptions,
}: UseStrapiFindProps): UseStrapiFindResult<T> {
	const [page, setPage] = useState(1);

	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<T>>({
		columnAccessor: "id",
		direction: "desc",
	});

	const query = useQuery<StrapiCollectionResponseInterface<T>, Error>({
		queryKey: [
			"find",
			serviceName,
			sortStatus,
			config?.params,
			page,
			...(key ?? []),
		],
		queryFn: async () =>
			strapiFind<T>(axios, serviceName, {
				...config,
				params: {
					...config?.params,
					pagination: {
						page: page,
						pageSize: config?.params?.pagination?.pageSize,
					},
					sort: `${sortStatus.columnAccessor.toString()}:${sortStatus.direction}`,
				},
			}),
		...queryOptions,
	} as UseQueryOptions<
		StrapiCollectionResponseInterface<T>,
		Error,
		StrapiCollectionResponseInterface<T>,
		QueryKey
	>);

	useEffect(() => {
		if (query.data) {
			setPage(query.data.meta.pagination.page);
		}
	}, [query.data]);

	const helper = {
		page,
		setPage,
		sortStatus,
		setSortStatus,
	};

	return {
		helper,
		...query,
	};
}
