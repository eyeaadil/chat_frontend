import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";
import GoogleAuthButton from "../../componenets/GoogleAuthButton";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="min-h-screen w-full fixed inset-0 overflow-hidden bg-gray-900 flex items-center justify-center">
      {/* Simplified animated background with standard animations */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        {/* Use standard animations that are built into Tailwind */}
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full animate-spin-slow-reverse"></div>
        
        {/* Additional elements with standard animations */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shadow-2xl rounded-2xl p-8 space-y-6 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(52, 55, 80, 0.8)" }}
        >
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-blue-500">ChatApp</span>
          </h1>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <label className="text-white text-sm block mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-blue-500/20 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <span className="absolute bottom-3 right-3 transform text-blue-500">
                👤
              </span>
            </div>

            <div className="relative">
              <label className="text-white text-sm block mb-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                className="w-full px-4 py-3 border border-blue-500/20 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <span className="absolute bottom-3 right-3 transform text-blue-500">
                @
              </span>
            </div>

            <div className="relative">
              <label className="text-white text-sm block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="w-full px-4 py-3 border border-blue-500/20 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <span className="absolute bottom-3 right-3 transform text-blue-500">
                🔒
              </span>
            </div>

            <div className="relative">
              <label className="text-white text-sm block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-blue-500/20 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <span className="absolute bottom-3 right-3 transform text-blue-500">
                🔒
              </span>
            </div>

            <div className="mt-2">
              <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform transition-all duration-300 mt-4"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-500/30 w-full"></div>
              <span className="px-4 text-gray-400 text-sm bg-transparent absolute">OR</span>
            </div>

            {/* Google Auth Button */}
            <GoogleAuthButton text="Sign up with Google" />

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-gray-300 text-sm hover:underline hover:text-blue-500 transition-colors"
              >
                Already have an account?
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;