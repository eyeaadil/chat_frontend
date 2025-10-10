import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import toast from "react-hot-toast";

const GoogleCallback = () => {
	const navigate = useNavigate();
	const { handleGoogleCallback } = useGoogleAuth();
	const [isProcessing, setIsProcessing] = useState(true);

	useEffect(() => {
		const processCallback = async () => {
			console.log("Processing Google OAuth callback...");
			setIsProcessing(true);
			
			// Add a small delay to ensure backend has processed the OAuth
			await new Promise(resolve => setTimeout(resolve, 500));
			
			const success = await handleGoogleCallback();
			
			if (success) {
				console.log("Google authentication successful, redirecting to home...");
				toast.success("Successfully logged in with Google!");
				// Use replace to prevent going back to callback page
				setTimeout(() => {
					navigate("/", { replace: true });
				}, 100);
			} else {
				console.log("Google authentication failed, redirecting to login...");
				setTimeout(() => {
					navigate("/login", { replace: true });
				}, 100);
			}
			
			setIsProcessing(false);
		};

		processCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="min-h-screen w-full fixed inset-0 overflow-hidden bg-gray-900 flex items-center justify-center">
			{/* Animated Background */}
			<div className="fixed inset-0 w-screen h-screen overflow-hidden">
				<div className="absolute -top-1/4 -left-1/4 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full animate-spin-slow"></div>
				<div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full animate-spin-slow-reverse"></div>
			</div>

			{/* Loading Content */}
			<div className="relative z-10 text-center">
				<div className="shadow-2xl rounded-2xl p-12 space-y-6 backdrop-blur-sm" style={{ backgroundColor: "rgba(52, 55, 80, 0.8)" }}>
					<div className="flex flex-col items-center gap-4">
						<span className="loading loading-spinner loading-lg text-blue-500"></span>
						<h2 className="text-2xl font-semibold text-white">
							Completing Google Sign In...
						</h2>
						<p className="text-gray-400">Please wait while we authenticate you</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoogleCallback;
