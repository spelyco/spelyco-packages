import { useThrottledValue } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useStrapiFind } from "../../strapi";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaModalHooksProps } from "../types";

export function useMediaModal({ axios, prefix }: MediaModalHooksProps) {
	const [searchValue, setSearchValue] = useState("");
	const throttledValue = useThrottledValue(searchValue, 1500);

	const mediaFind = useStrapiFind<MediaInterface>({
		axios,
		key: ["medias", prefix, throttledValue],
		serviceName: "spelyco-core/medias",
		config: {
			params: {
				filters: {
					name: {
						$startsWithi: prefix,
						$containsi: throttledValue,
					},
				},
			},
		},
	});

	const mediaDelete = useMutation({
		mutationKey: ["media-delete", prefix],
		mutationFn: async (id: string) => {
			const request = await axios.delete(`/api/upload/files/${id}`);
			return request.data;
		},
		onSuccess: () => {
			mediaFind.refetch();
		},
	});

	const onDestroy = (id: string) => {
		modals.openConfirmModal({
			title: "Delete Media",
			children: "Are you sure you want to delete this media?",
			labels: {
				confirm: "Delete",
				cancel: "Cancel",
			},
			onConfirm: () => mediaDelete.mutate(id),
		});
	};

	return {
		mediaFind,
		mediaDelete,
		searchValue,
		setSearchValue,
		onDestroy,
	};
}
