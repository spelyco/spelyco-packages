import { Stack } from "@mantine/core";
import { MediaSelect } from "@spelyco/react-core";
import { axiosInstance } from "../axios";

export function AssetPicker() {
	return (
		<Stack>
			<MediaSelect
				accept={["image"]}
				label="Asset Single!"
				axios={axiosInstance}
				prefix="module_1"
			/>
		</Stack>
	);
}
