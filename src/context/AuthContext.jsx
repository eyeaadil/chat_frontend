import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// console.log("Adil ") 	 	
export const AuthContextProvider = ({ children }) => {
	const fetchUsers = async () => {
		try {
						const res = await fetch("/api/users", {
				method: "GET",
				credentials: "include", // Include credentials to send the token
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			// Handle the fetched users data (e.g., update state or context)
			console.log(data); // For debugging purposes
		} catch (error) {
			console.error("Error fetching users:", error.message);
		}
	};

	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser, fetchUsers }}>{children}</AuthContext.Provider>;
};
