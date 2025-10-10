import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
	  },
	server: {
		port: 3000,
		proxy: {
			"/api": {
				// Use localhost for development, production URL will be handled differently
				target: "https://chatapp-backend-1-2k8y.onrender.com" || "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});