import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
	external: [
		"react",
		"react-dom",
		"@mantine/core",
		"@mantine/dates",
		"@mantine/form",
		"@mantine/hooks",
		"@tanstack/react-query",
		"axios",
		"clsx",
		"dayjs",
		"zustand",
	],
});
