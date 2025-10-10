/**
 * Environment configuration
 * Automatically detects development vs production and uses appropriate URLs
 * No .env files needed - detection is based on hostname
 */

const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const config = {
	// API Base URL (for fetch requests)
	apiUrl: isDevelopment ? "http://localhost:5000" : "https://chatapp-backend-1-2k8y.onrender.com",
	
	// Socket.IO URL
	socketUrl: isDevelopment ? "http://localhost:5000" : "https://chatapp-backend-1-2k8y.onrender.com",
	
	// Environment flags
	isDevelopment,
	isProduction: !isDevelopment,
};

export default config;
