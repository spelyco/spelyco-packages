import { Select as MantineSelect } from "@mantine/core";
import { useSelectFind } from "../hooks/use-select-find";
import type { SelectProps } from "../types";

export function Select<T>({
	queryKey,
	axios,
	config,
	serviceName,
	queryOptions,
	data,
	renderOption,
	...props
}: SelectProps<T>) {
	const { data: dataFind } = useSelectFind<T>({
		axios,
		key: queryKey,
		serviceName,
		config,
		queryOptions,
	});

	return (
		<MantineSelect
			{...props}
			data={dataFind?.data.map((item) => data(item))}
			renderOption={renderOption}
		/>
	);
}
