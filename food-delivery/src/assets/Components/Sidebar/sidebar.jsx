import { useLoginContext } from "../Contexts/LoginContext";
import AdminSidebar from "./Sidebar-Types/admin-sidebar";

function Sidebar()
{
    const {isLoggedIn} = useLoginContext();
    return(
        <div className={`${isLoggedIn?'w-2/10':'hidden'} bg-green-700 h-full text-white flex justify-start overflow-y-scroll`}>
            <AdminSidebar/>
        </div>
    )
}
export default Sidebar;