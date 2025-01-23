import {
	ActionIcon,
	AspectRatio,
	Badge,
	Flex,
	Group,
	Image,
	Skeleton,
	Stack,
	Text,
} from "@mantine/core";
import { IconFile, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import type { AxiosInstance } from "axios";
import { useRef, useState } from "react";
import type { MediaInterface } from "../interfaces/media-interface";
import { prepareImageUrl } from "../utils/prepare-image-url";

export function MediaModalPreviewItemSkeleton() {
	return (
		<Group flex={1}>
			<Skeleton w={68} h={68} />
			<Stack gap={"xs"} flex={1}>
				<Skeleton w={"100%"} h={14} />
				<Skeleton w={"100%"} h={14} />
			</Stack>
		</Group>
	);
}

type MediaModalPreviewItemProps = {
	media: MediaInterface;
	axios: AxiosInstance;
};

export function MediaModalPreviewItem({
	axios,
	media,
}: MediaModalPreviewItemProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const isImage = media.mime.startsWith("image/");
	const isVideo = media.mime.startsWith("video/");
	const isAudio = media.mime.startsWith("audio/");
	const isFile = media.mime.startsWith("application/");

	return (
		<Group flex={1} align="center">
			<AspectRatio ratio={1} w={68} h={68}>
				{isImage && (
					<Image src={prepareImageUrl(axios, media.url)} alt={media.name} />
				)}
				{isVideo && (
					<video
						src={prepareImageUrl(axios, media.url)}
						controls={false}
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					>
						<track kind="captions" />
					</video>
				)}
				{isAudio && (
					<Flex
						bg={"gray.1"}
						w={"100%"}
						h={"100%"}
						display={"flex"}
						justify={"center"}
						align={"center"}
					>
						<audio
							ref={audioRef}
							src={prepareImageUrl(axios, media.url)}
							onEnded={() => setIsPlaying(false)}
							style={{ display: "none" }}
						>
							<track kind="captions" />
						</audio>
						<ActionIcon
							size="xl"
							variant="transparent"
							onClick={handlePlayPause}
						>
							{isPlaying ? (
								<IconPlayerPause
									color="var(--mantine-color-gray-5)"
									size={48}
								/>
							) : (
								<IconPlayerPlay color="var(--mantine-color-gray-5)" size={48} />
							)}
						</ActionIcon>
					</Flex>
				)}
				{isFile && (
					<Flex
						bg={"gray.1"}
						w={"100%"}
						h={"100%"}
						display={"flex"}
						justify={"center"}
						align={"center"}
					>
						<IconFile size={48} color="var(--mantine-color-gray-5)" />
					</Flex>
				)}
			</AspectRatio>
			<Stack gap={"xs"} flex={1}>
				<Text size="md">{media.name}</Text>
				<Group gap={"xs"}>
					<Badge variant="light">ID: #{media.id}</Badge>
					<Badge variant="light">
						{(() => {
							const units = ["B", "KB", "MB", "GB", "TB"];
							let size = media.size;
							let unitIndex = 0;

							while (size >= 1024 && unitIndex < units.length - 1) {
								size /= 1024;
								unitIndex++;
							}

							return `${size.toFixed(2)} ${units[unitIndex]}`;
						})()}
					</Badge>
					<Badge variant="light">{media.mime}</Badge>
				</Group>
			</Stack>
		</Group>
	);
}
