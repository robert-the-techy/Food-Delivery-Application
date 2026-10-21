import '../../CSS/style.css'

function SignUpErrors({isVisible,closeError,errorMsg})
{
    return(
        <div className={`${isVisible} border-red-500 rounded-sm box-border bg-white w-5/6 border h-1/6`}>
            <button className="absolute -top-2 right-0 p-2" onClick={closeError}>
                <i className="ri-close-large-line text-red-500 text-xs font-extrabold cursor-pointer"></i>
            </button>
            <div className="w-full h-full flex justify-center items-center text-center">
                <p className="text-red-500 text-sm">{errorMsg}</p>
            </div>
        </div>
    )
}
export default SignUpErrors;