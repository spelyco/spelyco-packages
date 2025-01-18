import {
	ActionIcon,
	type ActionIconProps,
	Tooltip,
	type TooltipProps,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCopy } from "@tabler/icons-react";
import type { AxiosInstance } from "axios";
import { useStrapiCreate } from "../../strapi";

type MantineDataTableActionCopyProps<T = Record<string, unknown>> = Omit<
	ActionIconProps,
	"onClick"
> & {
	selected: T[];
	onChangeSelected: (selected: T[]) => void;
	tooltip?: TooltipProps;
	axios: AxiosInstance;
	serviceName: string;
	dictionary?: {
		title?: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
	};
};

export function MantineDataTableActionCopy<T extends Record<string, unknown>>({
	selected,
	onChangeSelected,
	tooltip,
	axios,
	serviceName,
	dictionary,
	...props
}: MantineDataTableActionCopyProps<T>) {
	const mutateDelete = useStrapiCreate({
		axios,
		serviceName,
		key: ["mantine-data-table", serviceName],
	});

	const handleCopy = async () => {
		modals.openConfirmModal({
			title: dictionary?.title ?? "Copy",
			children:
				dictionary?.message ?? "Are you sure you want to copy this item?",
			labels: {
				confirm: dictionary?.confirmLabel ?? "Copy",
				cancel: dictionary?.cancelLabel ?? "Cancel",
			},
			onConfirm: async () => {
				await selected.forEach(
					async (
						{ id, documentId, createdAt, updatedAt, publishedAt, ...newItem },
						_index,
					) =>
						await mutateDelete.mutateAsync({
							data: {
								...newItem,
							},
						}),
				);
			},
		});
	};

	return (
		<Tooltip label="Copy" {...tooltip}>
			<ActionIcon
				variant="light"
				color={"blue"}
				size={"md"}
				onClick={handleCopy}
				{...props}
			>
				<IconCopy size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
