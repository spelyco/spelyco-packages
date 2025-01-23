import { CheckboxGroup, RadioGroup } from "@mantine/core";
import type { PropsWithChildren } from "react";

type MediaModalHtmlInputProps = PropsWithChildren & {
	type: "checkbox" | "radio";
	value: number | number[] | null;
	onChange: (value: number | number[] | null) => void;
};

export function MediaModalHtmlInput({
	type,
	children,
	value,
	onChange,
}: MediaModalHtmlInputProps) {
	if (type === "checkbox" && Array.isArray(value)) {
		return (
			<CheckboxGroup
				value={value.map((item) => item.toString())}
				onChange={(value) => {
					onChange(value.map((item) => Number.parseInt(item)));
				}}
			>
				{children}
			</CheckboxGroup>
		);
	}
	return (
		<RadioGroup
			value={value?.toString()}
			onChange={(value) => {
				onChange(Number.parseInt(value));
			}}
		>
			{children}
		</RadioGroup>
	);
}
