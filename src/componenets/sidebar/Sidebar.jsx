// import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import { useAuthContext } from "../../context/AuthContext"


const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      {/* User icon and search bar in same row */}
      <div className="flex items-center gap-2 mb-2">
        {authUser && (
          <div className="avatar online flex-shrink-0">
            <div className="w-10 rounded-full">
              <img src={authUser.profilePic} alt={authUser.fullName} title={authUser.fullName} />
            </div>
          </div>
        )}
        <SearchInput/>
      </div>
    
    <div className="divider px-3"></div>
    <Conversations/>  
    <LogoutButton/>
    
    </div>
  )
}

export default Sidebar