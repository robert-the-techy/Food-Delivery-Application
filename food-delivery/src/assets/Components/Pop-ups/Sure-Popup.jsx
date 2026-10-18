import "../../CSS/style.css"

function SurePopup({sure_show,sure_hide,otp_popup})
{
    function OTP_Popup()
    {
        otp_popup?.();
        sure_hide?.();
    }
    return(
        <div className={`${sure_show} shadow-lg sure-in rounded-lg box-border border border-green-300 bg-linear-to-br from-green-100 via-green-200 to-green-300 h-fit w-80`}>
            <p className="text-2xl font-bold text-green-700">Are you sure</p>
            <p className="text-sm font-bold text-green-700 mb-5">you want to change the password?</p>
            <div className="flex justify-center items-center w-full space-x-4">
                <button onClick={sure_hide} className="flex justify-center items-center text-xs bg-red-300 p-2 shadow-md border border-red-500 rounded-lg space-x-1 text-red-600 uppercase font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                    <p>No</p>
                </button>
                <button onClick={OTP_Popup} className="flex justify-center items-center text-xs bg-green-300 border border-green-500 p-2 shadow-md rounded-lg space-x-1 text-green-600 uppercase font-bold w-1/2 cursor-pointer">
                    <i className="fa-solid fa-check"></i>
                    <p>Yes</p>
                </button>
            </div>
        </div>
    )
}
export default SurePopup;