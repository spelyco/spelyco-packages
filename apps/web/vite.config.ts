import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// HMR için gerekli
		hmr: true,
		// Watch options
		watch: {
			usePolling: true,
		},
	},
});
