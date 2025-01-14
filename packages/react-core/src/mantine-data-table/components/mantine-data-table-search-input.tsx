import {
	Group,
	type GroupProps,
	Select,
	type SelectProps,
	TextInput,
	type TextInputProps,
	rem,
} from "@mantine/core";
import { useMemo } from "react";
import type { MantineDataTableColumnProps } from "../types";

type MantineDataTableSearchInputProps = {
	columnDefs: MantineDataTableColumnProps[];
	select: SelectProps;
	input: TextInputProps;
	root?: GroupProps;
};

/**
 * @deprecated
 * @param param
 * @returns
 */
export function MantineDataTableSearchInput({
	columnDefs,
	select,
	input,
	root,
}: MantineDataTableSearchInputProps) {
	const memoizedColumns = useMemo(() => {
		return columnDefs.map((column) => ({
			value: column.accessor.toString(),
			label: column.title?.toString() ?? "",
		}));
	}, [columnDefs]);

	return (
		<Group gap={"xs"} {...root}>
			<Select
				w={rem(100)}
				searchable={false}
				data={memoizedColumns}
				{...select}
			/>
			<TextInput flex={1} {...input} />
		</Group>
	);
}
