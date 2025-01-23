import { Flex } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

export function MediaModalCardTypeFile() {
	return (
		<Flex
			bg={"gray.1"}
			w={"100%"}
			h={"100%"}
			display={"flex"}
			justify={"center"}
			align={"center"}
		>
			<IconFile size={48} color="var(--mantine-color-gray-5)" />
		</Flex>
	);
}
