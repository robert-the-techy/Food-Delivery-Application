import "../../CSS/style.css"
import LoginErrors from "../Error-Message/login-errors";
import { passValidate,cpassValidate } from "../../JS/validation"
import { useEffect,useState,useRef } from "react";

function ChangePasswordPopup({change_show,change_hide,code,email,onSaved})
{
    const passRef = useRef(null);

    useEffect(()=>
    {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => window.history.pushState(null, "", window.location.href);

        document.body.style.pointerEvents = "none";
        document.getElementById("otp-form").style.pointerEvents = "auto";
    },[]);

    useEffect(() => 
    {
        const t = setTimeout(() => passRef.current?.focus(), 50);
        return () => clearTimeout(t);
    },[change_show]);


    function enableMouse(e)
    {
        document.body.style.pointerEvents='auto';
    }

    const [errorset,setErrorSet] = useState('');
    const [errorMessage,seterrorMessage] = useState('go-in');

    const [userPassword,setUserPassword] = useState('');
    const [userCPassword,setUserCPassword] = useState('');

    // Password Visible Process
    const [passwordShow,setpasswordShow] = useState(false);
    const [passType,setpassType] = useState(false);
    let ptype = 'password';
    function setpassvisible(e)
    {
        e.preventDefault();

        setpasswordShow(!passwordShow);
        setpassType(!passType);
    }
    if(passType)
    {
        ptype = 'text';
    }
    else
    {
        ptype = 'password';
    }

    // Confirm Password Visible Process
    const [confirmPasswordShow,setconfirmPasswordShow] = useState(false);
    const [cpassType,setcpassType] = useState(false);
    let cptype = 'password';
    function setcpassvisible(e)
    {
        e.preventDefault();

        setconfirmPasswordShow(!confirmPasswordShow);
        setcpassType(!cpassType);
    }
    if(cpassType)
    {
        cptype = 'text';
    }
    else
    {
        cptype = 'password';
    }

    async function ChangePassword(e)
    {
        e.preventDefault();

        const passErrorMsg = passValidate(userPassword,userCPassword);
        const cpassErrorMsg = cpassValidate(userCPassword,userPassword);

        if(passErrorMsg=="" && cpassErrorMsg=="")
        {
            try
            {
                const response = await fetch("http://localhost:8080/authenticate/reset-password",
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({userEmpCode:code,userEmail:email,userPassword:userPassword}),
                });
                if(response.ok)
                { 
                    change_hide?.();
                    onSaved?.();
                    enableMouse();
                }
                else
                {
                    setErrorSet("Error : " + response.status);
                    seterrorMessage('come-out');
                }
            }
            catch(err)
            {
                alert(err);
            }
        }
        else if(passErrorMsg!="empty" && passErrorMsg !="")
        {
            setErrorSet(passErrorMsg);
            seterrorMessage('come-out');
        }
        else if(cpassErrorMsg!="empty" && cpassErrorMsg !="")
        {
            setErrorSet(cpassErrorMsg);
            seterrorMessage('come-out');
        }
        else if(passErrorMsg == "empty" || cpassErrorMsg == "empty")
        {
            setErrorSet("* fields should not be empty!");
            seterrorMessage('come-out');
        }
    }

    function ClosePopup(e)
    {
        e.preventDefault();
        enableMouse();
        change_hide?.();
    }

    return(
        <div id="otp-form" className={`${change_show} shadow-lg border border-gray-300 sure-in rounded-lg box-border bg-white h-fit w-100`}>

            <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

            <form onSubmit={ChangePassword} className="box-border flex flex-col w-full h-full text-black justify-between items-center space-y-8 p-5">
                <div className="w-full flex justify-center items-center space-x-1 uppercase text-lg">
                    <i className="fa-solid fa-key font-bold text-green-600"></i>
                    <p className="font-bold text-green-600">Password change</p>
                </div>

                <div className="flex flex-col w-full space-y-5">
                    <div className="flex bg-green-100 p-2 items-center space-x-1 rounded-md justify-between shadow-md">
                        <i className="ri-lock-password-fill text-lg px-1"></i>
                        <input ref={passRef} type={`${ptype}`} placeholder="password" onChange={(e)=>setUserPassword(e.target.value)} value={userPassword} className="outline-none text-xs w-full"/>
                        <button type="button" className="cursor-pointer" onClick={(e)=>setpassvisible(e)}>
                            <i className={`${passwordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                        </button>
                    </div>
                    <div className="flex bg-green-100 p-2 items-center space-x-1 rounded-md justify-between shadow-md">
                        <i className="ri-lock-password-fill text-lg px-1"></i>
                        <input type={`${cptype}`} placeholder="confirm password" onChange={(e)=>setUserCPassword(e.target.value)} value={userCPassword} className="outline-none text-xs w-full"/>
                        <button type="button" className="cursor-pointer" onClick={(e)=>setcpassvisible(e)}>
                            <i className={`${confirmPasswordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                        </button>
                    </div>
                </div>
                
                <div className="flex justify-between w-full items-center space-x-5">
                    <button onClick={(e)=>ClosePopup(e)} type="reset" className="w-1/2 uppercase bg-linear-to-br from-red-300 via-red-600 to-red-900 text-white text-xs font-extrabold p-2 cursor-pointer rounded-lg">Cancel</button>
                    <button type="submit" className="w-1/2 uppercase bg-linear-to-br from-green-300 via-green-600 to-green-900 text-white text-xs font-extrabold p-2 cursor-pointer rounded-lg">Change</button>
                </div>
            </form>
        </div>
    )
}
export default ChangePasswordPopup;