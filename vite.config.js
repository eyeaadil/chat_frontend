import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		port: 3001,
		proxy: {
			"/api": {
				target: "http://192.168.66.105:5000/",
			},
		},
	},
})
