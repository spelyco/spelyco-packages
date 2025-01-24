import { modals } from "@mantine/modals";
import type { AxiosInstance } from "axios";
import { useEffect, useCallback } from "react";
import { useStrapiDelete, useStrapiFind } from "../../strapi";
import type { UseStrapiFindResult } from "../../strapi/hooks/use-strapi-find";
import type {
	MantineDataTableConfigProps,
	MantineDataTableDeleteConfirmProps,
} from "../types";

type UseMantineDataTableProps = MantineDataTableConfigProps & {
	serviceName: string;
	axios: AxiosInstance;
};

export type UseMantineDataTableResult<T> = {
	fetchFind: UseStrapiFindResult<T>;
	handleDeleteItemWithModal: (
		documentId: string,
		{
			title,
			message,
			confirmLabel,
			cancelLabel,
			onSuccess,
			onError,
		}: MantineDataTableDeleteConfirmProps,
	) => void;
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

		const mutateDelete = useStrapiDelete({
			axios,
			serviceName,
			key: ["mantine-data-table", serviceName],
			...config?.delete,
		});

		const handleDeleteItemWithModal = useCallback(
			(
				documentId: string,
				{
					title,
					message,
					confirmLabel,
					cancelLabel,
					onSuccess,
					onError,
				}: MantineDataTableDeleteConfirmProps,
			) => {
				modals.openConfirmModal({
					title,
					children: message,
					labels: {
						confirm: confirmLabel,
						cancel: cancelLabel,
					},
					onConfirm: () => {
						mutateDelete.mutate(documentId);
						onSuccess?.();
					},
					onCancel: () => {
						onError?.();
					},
				});
			},
			[mutateDelete],
		);

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
			if (mutateDelete.isSuccess) {
				void fetchFind.refetch();
			}
		}, [mutateDelete.isSuccess, fetchFind.refetch()]); // fetchFind.refetch is stable, no need to include

		return {
			fetchFind,
			handleDeleteItemWithModal,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}
