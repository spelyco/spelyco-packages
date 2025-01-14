import type { AxiosInstance } from "axios";
import { useStrapiFind } from "../../strapi";
import type { UseStrapiFindResult } from "../../strapi/hooks/use-strapi-find";
import type { MantineDataTableConfigProps } from "../types";

type UseMantineDataTableProps = MantineDataTableConfigProps & {
	serviceName: string;
	axios: AxiosInstance;
};

export type UseMantineDataTableResult<T> = {
	fetchFind: UseStrapiFindResult<T>;
};

export function useMantineDataTable<T>({
	serviceName,
	axios,
	config,
}: UseMantineDataTableProps): UseMantineDataTableResult<T> {
	try {
		if (!axios) {
			throw new Error(
				"Axios instance is not initialized. Make sure to wrap your app with SpelyStoreProvider and provide axios config.",
			);
		}

		const fetchFind = useStrapiFind<T>({
			axios,
			key: ["mantine-data-table", serviceName],
			serviceName,
			...config?.find,
		});

		// const fetchFindOne = useStrapiFindOne<T>({
		// 	axios,
		// 	documentId: "",
		// 	serviceName,
		// 	...config?.findOne,
		// });

		// const mutateCreate = useStrapiCreate<T>({
		// 	axios,
		// 	serviceName,
		// 	...config?.create,
		// });

		// const mutateUpdate = useStrapiUpdate<T>({
		// 	axios,
		// 	serviceName,
		// 	...config?.update,
		// });
		// const mutateDelete = useStrapiDelete<T>({
		// 	axios,
		// 	serviceName,
		// 	...config?.delete,
		// });

		return {
			fetchFind,
			// fetchFindOne,
			// mutateCreate,
			// mutateUpdate,
			// mutateDelete,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}
