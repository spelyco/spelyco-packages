import {
	ActionIcon,
	type ActionIconProps,
	Tooltip,
	type TooltipProps,
} from "@mantine/core";
import { IconWaveSawTool } from "@tabler/icons-react";

type MantineDataTableActionStatusPublishedProps<T = Record<string, unknown>> =
	ActionIconProps & {
		selected: T[];
		onChangeSelected: (selected: T[]) => void;
		tooltip?: TooltipProps;
	};

export function MantineDataTableActionStatusPublished<T>({
	selected,
	onChangeSelected,
	tooltip,
	...props
}: MantineDataTableActionStatusPublishedProps<T>) {
	return (
		<Tooltip label="Change to published" {...tooltip}>
			<ActionIcon variant="light" color={"green"} size={"md"} {...props}>
				<IconWaveSawTool size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
