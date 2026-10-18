import { useNavigate } from "react-router-dom";
import "../../CSS/style.css"
import { useLoginContext } from "../Contexts/LoginContext";
import { useTokenContext } from "../Contexts/TokenContext";

function LogoutPopup({logout_show,logout_hide,code})
{
    const {setAccessToken} = useTokenContext();
    const {setIsLoggedIn} = useLoginContext();

    const navigate = useNavigate();

    async function Logout(e)
    {
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/authenticate/admin/logout/${code}`,
        {
            method: "POST",
            credentials: "include",
        });

        if(response.ok)
        {
            setAccessToken(null);
            setIsLoggedIn(false);
            sessionStorage.clear();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("adminCode");
            navigate("/", { replace: true });
        }
        else
        {
            alert("Something went wrong!");
        }
    }
    return(
        <div className={`${logout_show} shadow-lg border border-orange-300 sure-in rounded-lg box-border bg-linear-to-br from-orange-100 via-orange-200 to-orange-300 h-fit w-80`}>
            <p className="text-2xl font-bold text-orange-500">Are you sure</p>
            <p className="text-sm font-bold text-orange-500 mb-5">you want to log out?</p>
            <div className="flex justify-center items-center w-full space-x-4">
                <button onClick={logout_hide} className="flex justify-center items-center text-xs bg-red-300 border border-red-500 p-2 shadow-md rounded-lg space-x-1 text-red-600 uppercase font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                    <p>No</p>
                </button>
                <button onClick={(e)=>Logout(e)} className="flex justify-center items-center text-xs bg-orange-300 border border-orange-500 p-2 shadow-md rounded-lg space-x-1 text-orange-500 uppercase font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-check"></i>
                    <p>Yes</p>
                </button>
            </div>
        </div>
    )
}
export default LogoutPopup;