import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPaperclip } from "@tabler/icons-react";
import type { MediaSelectProps } from "../types";
import { MediaModalLayout } from "./media-modal-layout";

export function MediaSelect({
	axios,
	prefix,
	accept,
	...props
}: MediaSelectProps) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<MediaModalLayout opened={opened} onClose={close} />
			<Button onClick={open} leftSection={<IconPaperclip size={16} />}>
				Dosya Seç / Yükle
			</Button>
		</>
	);
}
