import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import config from "../config/environment";

const useGoogleAuth = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const loginWithGoogle = () => {
		try {
			// For Google OAuth, we need to use the direct backend URL
			// because Google needs to redirect back to the backend, not through Vercel proxy
			window.location.href = `${config.backendUrl}/api/auth/google`;
		} catch (error) {
			toast.error("Failed to initiate Google login");
		}
	};

	const handleGoogleCallback = async () => {
		setLoading(true);
		try {
			// Check URL for error parameter
			const urlParams = new URLSearchParams(window.location.search);
			const error = urlParams.get('error');
			
			if (error) {
				throw new Error(decodeURIComponent(error));
			}

			// Get user data from URL parameter (your backend sends it this way)
			const userDataParam = urlParams.get('user');
			
			if (!userDataParam) {
				throw new Error("No user data received from Google authentication");
			}

			// Decode and parse the user data
			const userData = JSON.parse(decodeURIComponent(userDataParam));
			
			console.log("Google OAuth user data:", userData);
			
			// Store user data and update context
			localStorage.setItem("chat-user", JSON.stringify(userData));
			setAuthUser(userData);
			
			return true;
		} catch (error) {
			console.error("Google auth callback error:", error);
			toast.error(error.message || "Google authentication failed");
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { loading, loginWithGoogle, handleGoogleCallback };
};

export default useGoogleAuth;
