import {
	Box,
	Button,
	Checkbox,
	Group,
	LoadingOverlay,
	Modal,
	Paper,
	SimpleGrid,
	TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMediaModal } from "../hooks/use-media-modal";
import type { MediaModalProps } from "../types";
import { MediaModalCard } from "./media-modal-card";

export function MediaModal({
	accept,
	prefix,
	axios,
	...props
}: MediaModalProps) {
	const { mediaFind, searchValue, setSearchValue } = useMediaModal({
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
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
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
					<Box p={5}>
						<SimpleGrid cols={4}>
							{mediaFind.data?.data.map((media) => (
								<Checkbox.Card key={media.documentId}>
									<Paper withBorder>
										<Checkbox.Indicator pos={"absolute"} top={10} left={10} />
										<MediaModalCard axios={axios} media={media} />
									</Paper>
								</Checkbox.Card>
							))}
						</SimpleGrid>
					</Box>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
