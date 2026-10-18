import { useNavigate } from "react-router-dom";
import "../../CSS/style.css"
import { useLoginContext } from "../Contexts/LoginContext";
import { useTokenContext } from "../Contexts/TokenContext";

function DeleteAccountPopup({delete_show,delete_hide,code})
{
    const {setAccessToken} = useTokenContext();
    const {setIsLoggedIn} = useLoginContext();

    const navigate = useNavigate();

    async function Delete(e)
    {
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/authenticate/admin/delete/${code}`,
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
        <div className={`${delete_show} shadow-lg border border-red-300 sure-in rounded-lg box-border bg-linear-to-br from-red-100 via-red-200 to-red-300 h-fit w-80`}>
            <div className="flex justify-center items-center text-2xl my-1 text-red-600">
                <i className="fa-solid fa-exclamation"></i>
                <p className="font-bold">Are you sure</p>
            </div>
            <p className="text-sm font-bold text-red-600 mb-5">you want to delete the account?</p>
            <div className="flex justify-center items-center w-full space-x-4">
                <button onClick={delete_hide} className="flex justify-center items-center text-xs bg-red-300 border border-red-500 p-2 shadow-md rounded-lg space-x-1 text-red-600 uppercase font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                    <p>No</p>
                </button>
                <button onClick={(e)=>Delete(e)} className="flex justify-center items-center text-xs bg-red-300 border border-red-500 p-2 shadow-md rounded-lg space-x-1 text-red-600 font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-check"></i>
                    <p>Yes</p>
                </button>
            </div>
        </div>
    )
}
export default DeleteAccountPopup;