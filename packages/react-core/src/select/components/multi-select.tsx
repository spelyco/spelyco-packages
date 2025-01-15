import {
	MultiSelect as MantineMultiSelect,
	type MultiSelectProps as MantineMultiSelectProps,
} from "@mantine/core";
import { useSelectFind } from "../hooks/use-select-find";
import type { SelectFindProps } from "../types";

type MultiSelectProps<T> = Omit<MantineMultiSelectProps, "data"> &
	SelectFindProps<T>;

export function MultiSelect<T>({
	queryKey,
	axios,
	config,
	serviceName,
	queryOptions,
	data,
	renderOption,
	...props
}: MultiSelectProps<T>) {
	const { data: dataFind } = useSelectFind<T>({
		axios,
		key: queryKey,
		serviceName,
		config,
		queryOptions,
	});

	return (
		<MantineMultiSelect
			{...props}
			data={dataFind?.data.map((item) => data(item))}
			renderOption={renderOption}
		/>
	);
}
