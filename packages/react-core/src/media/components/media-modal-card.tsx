import { AspectRatio, Box, Image, Text } from "@mantine/core";
import type { AxiosInstance } from "axios";
import type { MediaInterface } from "../interfaces/media-interface";
import { prepareImageUrl } from "../utils/prepare-image-url";

type MediaModalCardProps = {
	axios: AxiosInstance;
	media: MediaInterface;
};

export function MediaModalCard({ axios, media }: MediaModalCardProps) {
	return (
		<>
			<AspectRatio ratio={16 / 9}>
				<Image
					src={prepareImageUrl(axios, media.url)}
					alt={media.name}
					fit="contain"
				/>
			</AspectRatio>
			<Box>
				<Text>@mantine/core</Text>
				<Text>Core components library: inputs, buttons, overlays, etc.</Text>
			</Box>
		</>
	);
}
