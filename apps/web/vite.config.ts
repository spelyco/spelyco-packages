import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// HMR için gerekli
		hmr: {
			clientPort: 24678,
			port: 24678,
		},
		// Watch options
		watch: {
			usePolling: true,
		},
		port: 3005, // Ana uygulama portu
		strictPort: true, // Port kullanımdaysa hata ver
	},
});
