import { MultiSelect as MantineMultiSelect } from "@mantine/core";
import { useSelectFind } from "../hooks/use-select-find";
import type { MultiSelectProps } from "../types";

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
