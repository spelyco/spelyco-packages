import { Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMediaModal } from "../hooks/use-media-modal";
import type { MediaModalProps } from "../types";

export function MediaModal({
	accept,
	prefix,
	axios,
	...props
}: MediaModalProps) {
	const { mediaFind } = useMediaModal({
		axios,
		prefix,
		accept,
	});

	return (
		<Modal.Root size={"80%"} {...props}>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Group flex={1} justify="space-between">
						<TextInput
							placeholder="Dosya Ara"
							size="xs"
							flex={1}
							leftSection={<IconSearch size={16} />}
						/>
						<Group flex={1} justify="flex-end">
							<Button type="button" onClick={props.onClose}>
								İptal
							</Button>
							<Button>Seç</Button>
						</Group>
					</Group>
				</Modal.Header>
				<Modal.Body style={{ position: "relative" }}>
					<LoadingOverlay visible={mediaFind.isPending} />
					<div>Header</div>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
