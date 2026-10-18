import { useState } from "react";
import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { nameValidate,emailValidate,mobileValidate,roleValidate,passValidate,cpassValidate,dobValidate } from "../../JS/validation";
import SignUpErrors from "../Error-Message/signup-errors";
import LoadingBar from "../All/Animations/loadingbar";
import { useCookieContext } from "../Contexts/CookieContext";

function Signin()
{
    const today = new Date().toISOString().split('T')[0];

    // States for Form Variables
    const [userName,setUserName] = useState('');
    const [userEmail,setuserEmail] = useState('');
    const [userPhone,setUserPhone] = useState('');
    const [userRole,setUserRole] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userConfirmPassword,setUserConfirmPassword] = useState('');
    const [userRemember,setUserRemember] = useState(false);
    const [userDOB,setUserDOB] = useState(today);

    function datePick(e)
    {
        e.preventDefault();
        document.getElementById('datePicker').showPicker();
    }

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

    // Mouse Event Handling
    useEffect(()=>{
        document.body.style.pointerEvents='none';
        document.getElementById('signin-form').style.pointerEvents='auto';
    },[]);
    function enableMouse()
    {
        document.body.style.pointerEvents='auto';
    }

    // Form Validation

    const [errorset,setErrorSet] = useState('');

    const [errorMessage,seterrorMessage] = useState('go-in');

    const navigate = useNavigate();

    function formValidation(e)
    {
        e.preventDefault();

        const nameErrorMsg = nameValidate(userName);
        const emailErrorMsg = emailValidate(userEmail);
        const mobileErrorMsg = mobileValidate(userPhone);
        const roleErrorMsg = roleValidate(userRole);
        const passErrorMsg = passValidate(userPassword,userConfirmPassword);
        const cpassErrorMsg = cpassValidate(userConfirmPassword,userPassword);
        const dobErrorMsg = dobValidate(userDOB);


        if(nameErrorMsg=="" && emailErrorMsg=="" && mobileErrorMsg =="" && roleErrorMsg=="" && passErrorMsg=="" && cpassErrorMsg=="" && dobErrorMsg == "")
        {
            userCheck();
        }
        
        if(nameErrorMsg!="empty" && nameErrorMsg !="")
        {
            setErrorSet(nameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(emailErrorMsg!="empty" && emailErrorMsg !="")
        {
            setErrorSet(emailErrorMsg);
            seterrorMessage('come-out');
        }
        else if(mobileErrorMsg!="empty" && mobileErrorMsg !="")
        {
            setErrorSet(mobileErrorMsg);
            seterrorMessage('come-out');
        }
        else if(roleErrorMsg!="empty" && roleErrorMsg !="")
        {
            setErrorSet(roleErrorMsg);
            seterrorMessage('come-out');
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
        else if(dobErrorMsg!="empty" && dobErrorMsg !="")
        {
            setErrorSet(dobErrorMsg);
            seterrorMessage('come-out');
        }
        else if(nameErrorMsg=="empty" || emailErrorMsg == "empty" || mobileErrorMsg == "empty" || roleErrorMsg =="empty" || passErrorMsg == "empty" || cpassErrorMsg == "empty" || dobErrorMsg == "empty")
        {
            setErrorSet("* fields should not be empty!");
            seterrorMessage('come-out');
        }
    }

    async function userCheck()
    {
        const response = await fetch("http://localhost:8080/user-check",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({userEmail:userEmail}),
        })

        if(response.status == 409)
        {
            const msg = await response.json();
            setErrorSet(msg.message);
            seterrorMessage('come-out');
        }
        else if(response.ok)
        {
            askCode();
        }
    }

    const [loading,setLoading] = useState(false);
    const [load,setLoad] = useState('loading-in');
    const {setShowCookie} = useCookieContext();

    async function askCode()
    {
        const cookie = document.cookie.split(";");
        for(let c of cookie)
        {
            const [key,value] = c.trim().split("=");

            if(key === "CookieValue" && value === "Removed" && userRemember)
            {
                setShowCookie(true);
                setErrorSet("* Accept cookies");
                seterrorMessage('come-out');
                document.body.style.pointerEvents='auto';
                break;
            }
            else
            {
                setShowCookie(false);
                codeVerification();
                break;
            }
        }

        async function codeVerification()
        {
            setLoad('loading-out');
            setLoading(true);
            try
            {
                const response = await fetch("http://localhost:8080/authenticate/send-verification-code",
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({userEmail:userEmail}),
                }
                );

                if(response.ok)
                {
                    navigate("/verifycode",
                    {
                        state:
                        {
                            userName : userName,
                            userEmail : userEmail,
                            userPhone : userPhone,
                            userRole : userRole,
                            userPassword : userPassword,
                            userRemember : userRemember,
                            userDOB : userDOB,
                        }
                    }
                );
                }

                if(!response.ok)
                {
                    setErrorSet("* something went wrong!");
                    seterrorMessage('come-out');
                    enableMouse();
                }
            }
            catch(err)
            {
                alert(err);
                enableMouse();
            }
            finally
            {
                setLoad('loading-in');
                setLoading(false);
            }
        }
    }

    return(
        <div>
            {
                loading?
                (
                    <LoadingBar load={load}/>
                )
                :
                (
                    <div id="signin-form" className="border w-120 h-fit transition duration-500 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                        <Link to={'/'}>
                            <button className="absolute right-1 cursor-pointer" onClick={()=>enableMouse()}>
                                <i className="ri-close-large-line text-orange-400 text-md font-extrabold hover:text-black transition duration-300"></i>
                            </button>
                        </Link>

                        <SignUpErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

                        <form className="box-border flex flex-col w-full h-full text-black justify-between items-center px-12 py-10 space-y-3">
                            <div className="w-full mb-8">
                                <p className="text-2xl font-mono font-extrabold text-center uppercase">Create account</p>
                                <div className="text-xs flex italic space-x-1">
                                    <p>already a user?</p>
                                    <Link to={'/login'}>
                                        <button className="text-orange-400 underline cursor-pointer">log in</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full space-x-5">
                                <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <i className="ri-user-fill"></i>
                                    <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" className="outline-none w-full text-xs" placeholder="name" autoFocus/>
                                </div>
                                <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <i className="ri-mail-fill"></i>
                                    <input onChange={(e)=>setuserEmail(e.target.value)} value={userEmail} type="email" className="outline-none w-full text-xs" placeholder="email"/>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full space-x-5">
                                <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <i className="ri-phone-fill"></i>
                                    <input onChange={(e)=>setUserPhone(e.target.value)} value={userPhone} type="number" className="text-xs outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="phone"/>
                                </div>
                                <div className="w-1/2 p-2 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <select className="text-xs outline-none w-full bg-amber-100" value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
                                        <option value="">Who i am?</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="CUSTOMER">Customer</option>
                                        <option value="DELIVERY_PARTNER">Delivery Partner</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full space-x-5">
                                <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <i className="ri-lock-2-fill"></i>
                                    <input onChange={(e)=>setUserPassword(e.target.value)} value={userPassword} type={`${ptype}`} className="outline-none w-full text-xs" placeholder="password"/>
                                    <button className="cursor-pointer" onClick={(e)=>setpassvisible(e)}>
                                        <i className={`${passwordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                                    </button>
                                </div>
                                <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                    <i className="ri-lock-2-fill"></i>
                                    <input onChange={(e)=>setUserConfirmPassword(e.target.value)} value={userConfirmPassword} type={`${cptype}`} className="outline-none w-full text-xs" placeholder="confirm password"/>
                                    <button className="cursor-pointer" onClick={(e)=>setcpassvisible(e)}>
                                        <i className={`${confirmPasswordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full space-x-5">
                                <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md" onClick={datePick}>
                                    <i className="fa-solid fa-cake-candles cursor-pointer"></i>
                                    <input id="datePicker" max={today} onChange={(e)=>setUserDOB(e.target.value)} value={userDOB} type="date" className="cursor-pointer w-full text-xs [&::-webkit-calendar-picker-indicator]:to-black outline-none hover:[&::-webkit-calendar-picker-indicator]:cursor-pointer"/>
                                </div>
                                <div className="w-1/2 flex space-x-2 items-center">
                                    <input type="checkbox" onChange={(e)=>setUserRemember(e.target.checked)} checked={userRemember} className="accent-amber-100 h-3"/>
                                    <p className="text-xs">Remember me</p>
                                </div>
                            </div>
                            <button onClick={(e)=>formValidation(e)} type="submit" className="mt-3 hover:text-orange-400 hover:bg-black transition duration-300 uppercase bg-orange-400 text-black w-full text-xs font-extrabold p-2 cursor-pointer rounded-lg">Create account</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
export default Signin;