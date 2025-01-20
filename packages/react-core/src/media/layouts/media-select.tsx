import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPaperclip } from "@tabler/icons-react";
import { MediaModal } from "../components/media-modal";
import type { MediaSelectProps } from "../types";

export function MediaSelect({ axios, prefix, accept }: MediaSelectProps) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			{opened && (
				<MediaModal
					accept={accept}
					axios={axios}
					prefix={prefix}
					opened={true}
					onClose={close}
				/>
			)}
			<div>
				<Button onClick={open} leftSection={<IconPaperclip size={16} />}>
					Dosya Seç / Yükle
				</Button>
			</div>
		</>
	);
}
