import { Paper, Stack } from "@mantine/core";
import type { AxiosInstance } from "axios";
import { Suspense, lazy } from "react";
import { useStrapiFind } from "../../strapi";
import type { MediaInterface } from "../interfaces/media-interface";
import { MediaModalPreviewItemSkeleton } from "./media-modal-preview-item";

type MediaModalPreviewProps = {
	items: number[];
	axios: AxiosInstance;
};

const MediaModalPreviewItem = lazy(() =>
	import("./media-modal-preview-item").then((module) => ({
		default: module.MediaModalPreviewItem,
	})),
);

export function MediaModalPreview({ items, axios }: MediaModalPreviewProps) {
	const mediaFind = useStrapiFind<MediaInterface>({
		axios,
		key: ["medias", "preview", items.join(",")],
		serviceName: "spelyco-core/medias",
		config: {
			params: {
				filters: {
					id: {
						$in: items,
					},
				},
			},
		},
		queryOptions: {
			enabled: items.length > 0,
		},
	});

	if (mediaFind.isLoading) {
		return (
			<Stack>
				{Array(2)
					.fill(1)
					.map((_, index) => (
						<MediaModalPreviewItemSkeleton key={index.toString()} />
					))}
			</Stack>
		);
	}

	return (
		<Paper withBorder p={"sm"}>
			<Stack>
				{mediaFind.data?.data.map((item) => (
					<Suspense key={item.id} fallback={<MediaModalPreviewItemSkeleton />}>
						<MediaModalPreviewItem axios={axios} media={item} />
					</Suspense>
				))}
			</Stack>
		</Paper>
	);
}
