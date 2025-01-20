import { useThrottledValue } from "@mantine/hooks";
import { useState } from "react";
import { useStrapiFind } from "../../strapi";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaModalHooksProps } from "../types";

export function useMediaModal({ accept, axios, prefix }: MediaModalHooksProps) {
	const [searchValue, setSearchValue] = useState("");
	const throttledValue = useThrottledValue(searchValue, 1500);

	const mediaFind = useStrapiFind<MediaInterface>({
		axios,
		key: ["medias", prefix, accept.join(","), throttledValue],
		serviceName: "spelyco-core/medias",
		config: {
			params: {
				filters: {
					name: {
						$containsi: throttledValue,
					},
				},
			},
		},
	});

	return {
		mediaFind,
		searchValue,
		setSearchValue,
	};
}
