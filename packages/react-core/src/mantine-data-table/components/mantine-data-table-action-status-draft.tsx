import {
	ActionIcon,
	type ActionIconProps,
	Tooltip,
	type TooltipProps,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

type MantineDataTableActionStatusDraftProps<T = Record<string, unknown>> =
	ActionIconProps & {
		selected: T[];
		onChangeSelected: (selected: T[]) => void;
		tooltip?: TooltipProps;
	};

export function MantineDataTableActionStatusDraft<T>({
	selected,
	onChangeSelected,
	tooltip,
	...props
}: MantineDataTableActionStatusDraftProps<T>) {
	return (
		<Tooltip label="Change to draft" {...tooltip}>
			<ActionIcon variant="light" color={"orange"} size={"md"} {...props}>
				<IconCalendar size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
