import { useField } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useCallback } from "react";

export function useMantineDataTableSearchInput() {
	const inputField = useField({
		initialValue: "",
	});

	const selectField = useField({
		initialValue: "id",
	});

	const [debouncedSearch] = useDebouncedValue(inputField.getValue(), 200);

	const searchInputFilters = useCallback(() => {
		if (!debouncedSearch) {
			return {};
		}

		return {
			[selectField.getValue()]: {
				$contains: debouncedSearch ?? null,
			},
		};
	}, [selectField, debouncedSearch]);

	return {
		inputField,
		selectField,
		searchInputFilters,
	};
}
