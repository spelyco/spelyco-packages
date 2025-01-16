import { ActionIcon, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type MantineDataTableSelectedProps<T> = {
	selected: T[];
	onChangeSelected: (selected: T[]) => void;
};

export function MantineDataTableSelected<T>({
	selected,
	onChangeSelected,
}: MantineDataTableSelectedProps<T>) {
	if (!selected.length) {
		return null;
	}

	return (
		<Group>
			<ActionIcon variant="default" size={"xs"}>
				<IconTrash size={14} />
			</ActionIcon>
		</Group>
	);
}
