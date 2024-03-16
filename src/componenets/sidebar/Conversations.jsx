
import useGetConversations from "../../hooks/useGetConversation";
import Conersation from "./Conersation";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div>
   <div className='py-2 flex flex-col overflow-y-auto max-h-96'>
			{conversations.map((conversation, idx) => (
				<Conersation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
    </div>
  )
}

export default Conversations