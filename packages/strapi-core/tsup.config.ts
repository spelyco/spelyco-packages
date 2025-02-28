import { copyFile } from "node:fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		"strapi-server": "src/strapi-server.ts",
	},
	format: ["cjs", "esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	outDir: "dist",
	external: ["@strapi/strapi", "@strapi/admin", "koa"],
	async onSuccess() {
		// Build sonrası package.json'ı dist klasörüne kopyala
		await copyFile("package.json", "dist/package.json");
	},
});
