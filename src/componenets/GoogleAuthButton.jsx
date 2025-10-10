import { FcGoogle } from "react-icons/fc";
import useGoogleAuth from "../hooks/useGoogleAuth";

const GoogleAuthButton = ({ text = "Continue with Google" }) => {
	const { loginWithGoogle } = useGoogleAuth();

	return (
		<button
			type="button"
			onClick={loginWithGoogle}
			className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-gray-500/30 rounded-lg text-white font-semibold shadow-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-3"
		>
			<FcGoogle className="text-2xl" />
			<span>{text}</span>
		</button>
	);
};

export default GoogleAuthButton;
