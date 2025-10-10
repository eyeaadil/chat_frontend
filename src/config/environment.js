/**
 * Environment configuration
 * Automatically detects development vs production and uses appropriate URLs
 */

const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const config = {
	// API Base URL (for fetch requests)
	apiUrl: import.meta.env.VITE_API_URL || (isDevelopment ? "http://localhost:5000" : "https://chatapp-backend-1-2k8y.onrender.com"),
	
	// Socket.IO URL
	socketUrl: import.meta.env.VITE_SOCKET_URL || (isDevelopment ? "http://localhost:5000" : "https://chatapp-backend-1-2k8y.onrender.com"),
	
	// Environment flag
	isDevelopment,
	isProduction: !isDevelopment,
};

export default config;
