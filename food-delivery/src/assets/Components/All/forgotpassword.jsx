import { useEffect,useState,useRef } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import LoginErrors from "../Error-Message/login-errors";
import { passValidate,cpassValidate } from "../../JS/validation";
import LoadingBar from "../All/Animations/loadingbar";

function Forgotpassword()
{
    const [timeLeft,setTimeLeft] = useState(0);

    const [userEmpCode,setUserEmpCode] = useState('');
    const [userEmail,setUserEmail] = useState('');

    const [userPassword,setUserPassword] = useState('');
    const [userCPassword,setUserCPassword] = useState('');

    const [codeVisible,setCodeVisible] = useState('hidden');
    const [passVisible,setPassVisible] = useState('hidden');

    const navigate = useNavigate();

    const [codeTitle,setCodeTitle] = useState('');
    const [codeMsg,setCodeMsg] = useState('');

    const location = useLocation();

    useEffect(()=>
    {
        ownUseRef.current[0]?.focus();

        document.body.style.pointerEvents='none';
        document.getElementById('forgot-form').style.pointerEvents='auto';

    },[]);
    function enableMouse(e)
    {
        document.body.style.pointerEvents='auto';
    }

    
    const [code,setCode] = useState(["","","","",""]);
    const ownUseRef = useRef([]);

    function handleChange(text,index)
    {
        const oneText = text.slice(-1);

        const newCode = [...code];
        newCode[index] = oneText;
        setCode(newCode);

        if(oneText && index < 4)
        {
            ownUseRef.current[index+1]?.focus();
        }
    }

    function handleKey(key,index)
    {
        if(key.key == "Backspace" && !code[index] && index > 0)
        {
            ownUseRef.current[index-1]?.focus();
        }

        if(key.key == "ArrowLeft" && index > 0)
        {
            ownUseRef.current[index-1]?.focus();
        }

        if(key.key == "ArrowRight" && index < 4)
        {
            ownUseRef.current[index+1]?.focus();
        }
    }

    const [errorset,setErrorSet] = useState('');

    const [errorMessage,seterrorMessage] = useState('go-in');

    const [codeVerified,setCodeVerified] = useState(false);

    async function formHandleFunction(e)
    {
        e.preventDefault();

        if(userEmail == "" || userEmpCode == "")
        {
            setErrorSet('* fields should not be empty!');
            seterrorMessage('come-out');
            enableMouse();
        }
        else
        {

            if(timeLeft==0)
            {
                askCode();

                setCodeTitle("Verification code has been sent");
                const emailFirst = userEmail.slice(0,6);
                const emailMiddle = "*".repeat(userEmail.length - 14);
                const emailLast = userEmail.slice(-8);
                const codeMessage = "to your email id " + emailFirst + emailMiddle + emailLast;
                setCodeMsg(codeMessage);

            }
            else
            {
                if(!codeVerified)
                {
                    setCodeTitle("Verification code has been sent");
                    const emailFirst = userEmail.slice(0,6);
                    const emailMiddle = "*".repeat(userEmail.length - 14);
                    const emailLast = userEmail.slice(-8);
                    const codeMessage = "to your email id " + emailFirst + emailMiddle + emailLast;
                    setCodeMsg(codeMessage);

                    let receivedCode = '';

                    code.forEach((text)=>
                    {
                        receivedCode += text;
                    })

                    if(receivedCode!="" && receivedCode.length == 5)
                    {
                        verifyCode(receivedCode);
                    }
                    else if(receivedCode == "")
                    {
                        setErrorSet('* empty code can not be accepted!');
                        seterrorMessage('come-out');
                        enableMouse();
                    }
                    else if(receivedCode.length < 5)
                    {
                        setErrorSet('* verification code must have 6 digits!');
                        seterrorMessage('come-out');
                        enableMouse();
                    }
                }
                else
                {
                    const passErrorMsg = passValidate(userPassword,userCPassword);
                    const cpassErrorMsg = cpassValidate(userCPassword,userPassword);

                    if(passErrorMsg=="" && cpassErrorMsg=="")
                    {
                        const response2 = await fetch("http://localhost:8080/authenticate/reset-password",
                        {
                            method:"POST",
                            headers:
                            {
                                "Content-Type":"application/json",
                            },
                            body:JSON.stringify({userEmpCode:userEmpCode,userEmail:userEmail,userPassword:userPassword}),
                        });
                        if(!response2.ok)
                        { 
                            setErrorSet("* something went wrong,can not reset password!");
                            seterrorMessage('come-out');
                            enableMouse();
                        }
                        else
                        {
                            enableMouse();
                            navigate("/login");
                        }
                    }

                    if(passErrorMsg!="empty" && passErrorMsg !="")
                    {
                        setErrorSet(passErrorMsg);
                        seterrorMessage('come-out');
                        enableMouse();
                    }
                    else if(cpassErrorMsg!="empty" && cpassErrorMsg !="")
                    {
                        setErrorSet(cpassErrorMsg);
                        seterrorMessage('come-out');
                        enableMouse();
                    }
                    else if(passErrorMsg == "empty" || cpassErrorMsg == "empty")
                    {
                        setErrorSet("* fields should not be empty!");
                        seterrorMessage('come-out');
                        enableMouse();
                    }
                }
            }
        }
    };

    const timerRef = useRef(null);
    const sendingRef = useRef(false);
    const [isSendingCode,setIsSendingCode] = useState(false);

    useEffect(()=>
    {
        return ()=>
        {
            if(timerRef.current)
            {
                clearInterval(timerRef.current);
            }
        }
    },[]);

    const [loading,setLoading] = useState(false);
    const [load,setLoad] = useState('loading-in');

    async function askCode()
    {
        if(isSendingCode || timeLeft > 0) return;

        setLoad('loading-out');
        setLoading(true);

        try
        {
            const response = await fetch("http://localhost:8080/authenticate/send-forgot-code",
            {
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({userEmpCode:userEmpCode,userEmail:userEmail}),
            }
            );

            if(!response.ok)
            { 
                setErrorSet("* something went wrong!");
                seterrorMessage('come-out');
                enableMouse();
                return;
            }
            else
            {
                clearInterval(timerRef.current);
                setCode(["","","","",""]);
                setTimeLeft(5*60);
                setCodeVisible('');
               
                const timerId = setInterval(() => 
                {
                    setTimeLeft((currentTime) => 
                        {
                            if (currentTime <= 1) 
                                {
                                    clearInterval(timerId); // clears this exact timer
                                    if (timerRef.current === timerId)
                                    {
                                        timerRef.current = null;
                                    }
                                    return 0;
                                }
                                return currentTime - 1;
                        });
                }, 1000);
                timerRef.current = timerId;
            }
        }
        catch(err)
        {
            alert(err);
            enableMouse();
        }
        finally
        {
            setLoad("loading-in");
            setLoading(false);

            enableMouse();

            sendingRef.current = false;
            setIsSendingCode(false);
        }
    }
    async function verifyCode(code)
    {
        const response = await fetch("http://localhost:8080/authenticate/verify-forgot-code",
            {
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({userEmpCode:userEmpCode,userEmail:userEmail,userForgotCode:code}),
            }
        );

        if(response.ok)
        {
            setPassVisible('');
            setCodeVerified(true);
        }
        else if(response.status == 401)
        {
            setErrorSet('* invalid code!');
            seterrorMessage('come-out');
            enableMouse();
        }
        else
        {
            setErrorSet('* something went wrong!');
            seterrorMessage('come-out');
            enableMouse();
        }
    }

    const minutes = String(Math.floor(timeLeft/60));
    const seconds = String(timeLeft%60);

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

    return(
        <div>
            {
                loading?
                (
                    <LoadingBar load={load}/>
                )
                :
                (
                    <div className="border bg-white h-fit w-90 rounded-sm px-10 pb-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                        <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

                        <p className="uppercase font-bold text-black text-center py-8">Password reset</p>
                        <form onSubmit={formHandleFunction} id="forgot-form" className="text-black flex flex-col space-y-5">
                            <div className="bg-amber-100 p-1 flex items-center space-x-1 rounded-md shadow-md">
                                <i className="ri-id-card-fill text-md px-1"></i>
                                <input type="text" onChange={(e)=>setUserEmpCode(e.target.value)} value={userEmpCode} placeholder="employee code" className="outline-none text-xs w-full" autoFocus/>
                            </div>
                            <div className="bg-amber-100 p-1 flex items-center space-x-1 rounded-md shadow-md">
                                <i className="ri-mail-fill text-md px-1"></i>
                                <input type="text" onChange={(e)=>setUserEmail(e.target.value)} value={userEmail} placeholder="email id" className="outline-none text-xs w-full"/>
                            </div>
                            <div className={`py-2 ${codeVisible}`}>
                                <p className="font-bold text-xs mb-5">A verification code has been sent to your email</p>
                                <div className="w-full flex justify-between">
                                    {
                                        code.map((text,index)=>
                                        {
                                            return(
                                                <input

                                                key={index}
                                                value={text}
                                                type="text"
                                                className="bg-amber-100 shadow-md p-1 rounded-lg h-8 w-8 text-center outline-none focus:border-2 focus:border-orange-400 text-md font-bold"
                                                maxLength={1}

                                                ref={(element)=>ownUseRef.current[index] = element}
                                                onChange={(e)=>handleChange(e.target.value,index)}
                                                onKeyDown={(key)=>handleKey(key,index)}

                                                />
                                            )
                                        })
                                    }                
                                </div>
                                <p className={`font-bold text-sm ${timeLeft==0?'hidden':''}`}><span className="text-orange-400">Valid for</span> {minutes}:{seconds.toString().padStart(2,"0")}</p>
                            </div>
                            <div className={`space-y-4 ${passVisible}`}>
                                <div className="flex bg-amber-100 p-1 items-center space-x-1 rounded-md justify-between shadow-md">
                                    <i className="ri-lock-password-fill text-md px-1"></i>
                                    <input type={`${ptype}`} placeholder="password" onChange={(e)=>setUserPassword(e.target.value)} value={userPassword} className="outline-none text-xs w-full"/>
                                    <button type="button" className="cursor-pointer" onClick={(e)=>setpassvisible(e)}>
                                        <i className={`${passwordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                                    </button>
                                </div>
                                <div className="flex bg-amber-100 p-1 items-center space-x-1 rounded-md justify-between shadow-md">
                                    <i className="ri-lock-password-fill text-md px-1"></i>
                                    <input type={`${cptype}`} placeholder="confirm password" onChange={(e)=>setUserCPassword(e.target.value)} value={userCPassword} className="outline-none text-xs w-full"/>
                                    <button type="button" className="cursor-pointer" onClick={(e)=>setcpassvisible(e)}>
                                        <i className={`${confirmPasswordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <Link to={'/login'}>
                                    <button className="bg-orange-400 text-black hover:bg-black hover:text-orange-400 transition duration-500 py-2 px-4 font-extrabold text-xs rounded-lg cursor-pointer uppercase">Cancel</button>
                                </Link>
                                <button disabled={isSendingCode} type="submit" className="bg-orange-400 text-black hover:bg-black hover:text-orange-400 transition duration-500 py-2 px-4 font-extrabold text-xs rounded-lg cursor-pointer uppercase">
                                    {
                                        codeVerified && timeLeft > 0?'Reset':'Verify'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
export default Forgotpassword;