import {
	ActionIcon,
	type ActionIconProps,
	Tooltip,
	type TooltipProps,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type MantineDataTableActionDeleteProps<T = Record<string, unknown>> =
	ActionIconProps & {
		selected: T[];
		onChangeSelected: (selected: T[]) => void;
		tooltip?: TooltipProps;
	};

export function MantineDataTableActionDelete<T>({
	selected,
	onChangeSelected,
	tooltip,
	...props
}: MantineDataTableActionDeleteProps<T>) {
	return (
		<Tooltip label="Delete" {...tooltip}>
			<ActionIcon variant="light" color={"red"} size={"md"} {...props}>
				<IconTrash size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
