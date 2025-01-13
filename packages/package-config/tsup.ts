import { type Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
	entry: {
		index: "src/index.ts",
	},
	banner: {
		js: "'use client'",
	},
	clean: true,
	format: ["cjs", "esm"],
	external: ["react"],
	dts: true,
	target: "es2020",
	sourcemap: true,
	...options,
}));
