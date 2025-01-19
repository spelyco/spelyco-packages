import { Button, Group, Modal, type ModalProps } from "@mantine/core";

export function MediaModalLayout(props: ModalProps) {
	return (
		<Modal size={"80%"} {...props}>
			<div>Header</div>
			<div>Body</div>
			<Group justify="flex-end">
				<Button>İptal</Button>
				<Button>Seç</Button>
			</Group>
		</Modal>
	);
}
