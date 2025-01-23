import {
	ActionIcon,
	ActionIconGroup,
	AspectRatio,
	Box,
	CopyButton,
	Image,
	Indicator,
	Text,
	Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconTrash } from "@tabler/icons-react";
import type { AxiosInstance } from "axios";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaDictionary } from "../types";
import { prepareImageUrl } from "../utils/prepare-image-url";
import { staticDictionary } from "../utils/static-dictronary";
import { MediaModalCardTypeFile } from "./media-modal-card-type-file";
import { MediaModalCardTypeSound } from "./media-modal-card-type-sound";

type MediaModalCardProps = {
	axios: AxiosInstance;
	media: MediaInterface;
	onDestroy: (id: string) => void;
	dictionary?: MediaDictionary;
};

export function MediaModalCard({
	axios,
	media,
	onDestroy,
	dictionary,
}: MediaModalCardProps) {
	const isImage = media.mime.startsWith("image/");
	const isVideo = media.mime.startsWith("video/");
	const isAudio = media.mime.startsWith("audio/");
	const isFile = media.mime.startsWith("application/");

	return (
		<>
			{new Date(media.createdAt).getTime() >
				new Date().getTime() - 1000 * 60 * 60 * 24 && (
				<Indicator
					processing
					color="blue"
					pos={"absolute"}
					top={0}
					right={0}
					size={10}
				/>
			)}
			<ActionIconGroup pos={"absolute"} top={10} right={10}>
				<Tooltip
					label={
						dictionary?.main.modal.wrapper.card.deleteTooltip ??
						staticDictionary.main.modal.wrapper.card.deleteTooltip
					}
				>
					<ActionIcon
						size={"input-xs"}
						variant="default"
						onClick={() => onDestroy(media.id.toString())}
					>
						<IconTrash color="red" size={16} />
					</ActionIcon>
				</Tooltip>
				<CopyButton value={prepareImageUrl(axios, media.url)}>
					{({ copy, copied }) => (
						<Tooltip
							label={
								dictionary?.main.modal.wrapper.card.copyTooltip ??
								staticDictionary.main.modal.wrapper.card.copyTooltip
							}
						>
							<ActionIcon
								type="button"
								size={"input-xs"}
								variant="default"
								onClick={copy}
							>
								{copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</ActionIconGroup>
			<AspectRatio ratio={16 / 9}>
				{isImage && (
					<Image
						src={prepareImageUrl(axios, media.url)}
						alt={media.name}
						fit="contain"
					/>
				)}
				{isVideo && (
					<video
						src={prepareImageUrl(axios, media.url)}
						controls
						style={{ width: "100%", height: "100%", objectFit: "contain" }}
					>
						<track kind="captions" />
					</video>
				)}
				{isAudio && (
					<MediaModalCardTypeSound url={prepareImageUrl(axios, media.url)} />
				)}
				{isFile && <MediaModalCardTypeFile />}
			</AspectRatio>
			<Box p={"xs"}>
				<Text size="sm" lineClamp={1}>
					{media.name}
				</Text>
				<Text size="xs" c="dimmed">
					#{media.id} - {media.mime}
				</Text>
			</Box>
		</>
	);
}
