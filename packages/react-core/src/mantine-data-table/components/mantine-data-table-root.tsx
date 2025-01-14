import { Stack, type StackProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function MantineDataTableRoot(props: PropsWithChildren<StackProps>) {
	return <Stack gap={"xs"} {...props} />;
}
