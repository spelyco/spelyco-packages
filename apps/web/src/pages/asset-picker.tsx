import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MediaSelect } from "@spelyco/react-core";
import { axiosInstance } from "../axios";

export function AssetPicker() {
	const form = useForm({
		initialValues: {
			file: 6,
			files: [6, 4],
		},
	});

	form.watch("file", ({ value }) => {
		console.log("File", value);
	});

	form.watch("files", ({ value }) => {
		console.log("Files", value);
	});

	return (
		<Stack>
			<MediaSelect
				accept={["image"]}
				axios={axiosInstance}
				prefix="module_2"
				type="radio"
				{...form.getInputProps("file", {
					type: "checkbox",
				})}
			/>
			<MediaSelect
				accept={["image"]}
				axios={axiosInstance}
				prefix="module_1"
				type="checkbox"
				maxSize={100 * 1024 * 1024}
				{...form.getInputProps("files", {
					type: "checkbox",
				})}
			/>
		</Stack>
	);
}
