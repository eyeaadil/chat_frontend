import { motion } from "framer-motion";
import MessageContainer from "../../componenets/messages/MessageContainer";
import Sidebar from "../../componenets/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        <div className="absolute -top-1/3 -left-1/3 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-1/3 -right-1/3 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Starts hidden and slightly lower
        animate={{ opacity: 1, y: 0 }}  // Fades in and moves up
        transition={{ duration: 0.8 }}  // Smooth transition
        className="relative z-10 border border-gray-700 flex sm:h-[450px] md:h-[550px] w-full max-w-4xl rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-xl"
      >
        <Sidebar />
        <MessageContainer />
      </motion.div>
    </div>
  );
};

export default Home;
