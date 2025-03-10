import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:5000/api/users", {
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log("tttttttt");
				const data = await res.json();

				console.log("aaaaaa",data);
				
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message || "Failed to fetch conversations");
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;