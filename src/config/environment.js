/**
 * Environment configuration
 * Automatically detects development vs production and uses appropriate URLs
 * No .env files needed - detection is based on hostname
 */

const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const BACKEND_URL = isDevelopment 
	? "http://localhost:5000" 
	: "https://chatapp-backend-1-2k8y.onrender.com";

const config = {
	// Backend URL (direct access, not through Vercel proxy)
	backendUrl: BACKEND_URL,
	
	// API Base URL (for fetch requests - uses Vercel proxy in production)
	apiUrl: isDevelopment ? "http://localhost:5000" : "https://chatapp-backend-1-2k8y.onrender.com",
	
	// Socket.IO URL (direct connection to backend)
	socketUrl: BACKEND_URL,
	
	// Environment flags
	isDevelopment,
	isProduction: !isDevelopment,
};

export default config;
