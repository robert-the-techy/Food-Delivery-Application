import { useRef, useEffect, useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Contexts/TokenContext";
import { useLoginContext } from "../../Contexts/LoginContext";
import SignUpErrors from "../../Error-Message/signup-errors";
import LoadingBar from "../Animations/loadingbar";

function Verification()
{
    const companyCodeForAdmin = "FD2026";

    const {setAccessToken} = useTokenContext();

    const navigate = useNavigate();

    const location = useLocation();
    const userData = location.state;

    const [timeLeft,setTimeLeft] = useState(5*60);

    const [code,setCode] = useState(["","","","","",""]);
    const ownUseRef = useRef([]);

    function handleChange(text,index)
    {
        const oneText = text.slice(-1);

        const newCode = [...code];
        newCode[index] = oneText;
        setCode(newCode);

        if(oneText && index < 5)
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

        if(key.key == "ArrowRight" && index < 5)
        {
            ownUseRef.current[index+1]?.focus();
        }
    }

    const [codeTitle,setCodeTitle] = useState('');
    const [codeMsg,setCodeMsg] = useState('');

    const [companyCodeVisible,setCompanyCodeVisible] = useState(false);
    const [companyCode,setCompanyCod] = useState('');

    useEffect(()=>
    {
        if(userData?.userRole == "ADMIN")
        {
            setCompanyCodeVisible(true);
        }
        else
        {
            setCompanyCodeVisible(false);
        }

        if(!userData)
        {
            enableMouse();
            navigate("/signin");
        }

        window.history.pushState(null, "", window.location.href);

        window.onpopstate = () => 
        {
            window.history.pushState(null, "", window.location.href);
        }
        
        document.body.style.pointerEvents='none';

        ownUseRef.current[0]?.focus();

        setCodeTitle("Verification code has been sent");

        const emailFirst = userData?.userEmail.slice(0,6);
        const emailMiddle = "*".repeat(userData?.userEmail.length - 14);
        const emailLast = userData?.userEmail.slice(-8);
        const codeMessage = "to your email id " + emailFirst + emailMiddle + emailLast;

        setCodeMsg(codeMessage);

        // Set Minutes Timer
        const timer = setInterval(() => 
        {
            setTimeLeft((previousTime)=>
            {
                if(previousTime<=1)
                {
                    clearInterval(timer);
                }
                return previousTime - 1;
            });
        }, 1000);
        
        return ()=>
        {
            clearInterval(timer);
            document.body.style.pointerEvents='auto';
        };

    },[]);
    function enableMouse()
    {
        document.body.style.pointerEvents='auto';
    }

    const [loading,setLoading] = useState(false);
    const [load,setLoad] = useState('loading-in');

    async function askCode()
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
                body:JSON.stringify({userEmail:userData?.userEmail}),
            }
            );

            if(!response.ok)
            { 
                setErrorSet("* something went wrong!");
                seterrorMessage('come-out');
            }
        }
        catch(err)
        {
            alert(err);
        }
        finally
        {
            setLoad('loading-in');
            setLoading(false);
        }
    }
    async function verifyCode(code)
    {
        setLoad('loading-out');
        setLoading(true);
        try
        {
            const response = await fetch("http://localhost:8080/authenticate/verify-verification-code",
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({userEmail:userData?.userEmail,userVerificationCode:code}),
                }
            );

            if(response.ok)
            {
                await registerRespose();
            }
            else if(response.status == 401)
            {
                setErrorSet('* invalid code!');
                seterrorMessage('come-out');
            }
            else
            {
                console.log("verify failed:", response.status, await response.text());
                setErrorSet('* something went wrong!');
                seterrorMessage('come-out');
            }
        }
        catch(err)
        {
            alert(err);
        }
        finally
        {
            setLoad('loading-in');
            setLoading(false);
        }
    }

    const [errorset,setErrorSet] = useState('');

    const [errorMessage,seterrorMessage] = useState('go-in');

    function formHandleFunction(e)
    {
        e.preventDefault();

        if(timeLeft==0)
        {
            setCode(["","","","","",""]);
            ownUseRef.current[0]?.focus();
            
            setTimeLeft(5*60);
            const timer = setInterval(() => 
            {
                setTimeLeft((previousTime)=>
                {
                    if(previousTime<=1)
                    {
                        clearInterval(timer);
                    }
                    return previousTime - 1;
                });
            }, 1000);

            askCode();
        }
        else
        {
            e.preventDefault();

            let receivedCode = '';

            code.forEach((text)=>
            {
                receivedCode += text;
            })

            if(receivedCode!="" && receivedCode.length == 6)
            {
                if(userData?.userRole == "ADMIN")
                {
                    if(companyCode == companyCodeForAdmin)
                    {
                        verifyCode(receivedCode.toUpperCase());
                    }
                    else if(companyCode !="")
                    {
                        if(companyCode != companyCodeForAdmin)
                        {
                            setErrorSet('* invalid companay code!');
                            seterrorMessage('come-out');
                        }                   
                    }
                    else if(companyCode == "")
                    {
                        setErrorSet('* companay code can not be empty!');
                        seterrorMessage('come-out');
                    }
                }
                else
                {
                    verifyCode(receivedCode.toUpperCase());
                }
            }
            else if(receivedCode == "")
            {
                setErrorSet('* empty code can not be accepted!');
                seterrorMessage('come-out');
            }
            else if(receivedCode.length < 6)
            {
                setErrorSet('* verification code must have 6 digits!');
                seterrorMessage('come-out');
            }
        }
    };

    const {setIsLoggedIn} = useLoginContext();

    // Register Respose
    async function registerRespose()
    {
        setLoad('loading-out');
        setLoading(true);
        
        if(userData?.userRole == "ADMIN")
        {
            const adminData =
            {
                userName : userData?.userName,
                userEmail : userData?.userEmail,
                userPhone : userData?.userPhone,
                userRole : userData?.userRole,
                userPassword : userData?.userPassword,
                userRememberMe : userData?.userRemember,
                userDateOfBirth : userData?.userDOB,
            }
            
            try
            {
                const response = await fetch(`http://localhost:8080/authenticate/admin/register`,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify(adminData),
                })
                
                if(response.ok)
                {
                    const data = await response.json();
                    setAccessToken(data.accessToken);
                    setIsLoggedIn(true);
                    enableMouse();

                    localStorage.setItem("adminCode",data.adminCode);

                    navigate("/admin/dashboard");
                }
                else if(response.status == 400)
                {
                    setErrorSet('* invalid request!');
                    seterrorMessage('come-out');
                }
                else
                {
                    setErrorSet('* something went wrong,try again!');
                    seterrorMessage('come-out');
                }
            }
            catch(err)
            {
                alert(err);
            }
            finally
            {
                setLoad('loading-in');
                setLoading(false);
            }
        }
    }

    const minutes = String(Math.floor(timeLeft/60));
    const seconds = String(timeLeft%60);

    return(
        <>
        {
            loading?
            (
                <LoadingBar load={load}/>
            )
            :
            (
                <div id="verification-form" className="pointer-events-auto border w-110 h-fit transition duration-500 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">

                    <SignUpErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

                    <form onSubmit={formHandleFunction} className="box-border flex flex-col w-full h-full text-black justify-between items-center px-12 py-10 space-y-8">
                        <div className="w-full text-center">
                            <p className="text-xl font-mono font-extrabold text-center">{codeTitle}</p>
                            <p className="text-xs italic">{codeMsg}</p>
                        </div>
                        <div className={`w-full ${companyCodeVisible?'':'hidden'}`}>
                            <input onChange={(e)=>setCompanyCod(e.target.value)} value={companyCode} type="text" placeholder="enter your company code (if you are an admin)" className="outline-none shadow-md w-full text-xs bg-amber-100 p-3 rounded-lg border-amber-100 border-2 focus:border-orange-400"/>
                        </div>
                        <div className="w-full flex justify-between">
                            {
                                code.map((text,index)=>
                                {
                                    return(
                                        <input

                                        key={index}
                                        value={text}
                                        type="text"
                                        className="bg-amber-100 shadow-md p-1 uppercase rounded-lg h-10 w-10 text-center outline-none focus:border-2 focus:border-orange-400 text-lg font-bold"
                                        maxLength={1}

                                        ref={(element)=>ownUseRef.current[index] = element}
                                        onChange={(e)=>handleChange(e.target.value,index)}
                                        onKeyDown={(key)=>handleKey(key,index)}

                                        />
                                    )
                                })
                            }                
                        </div>
                        <div>
                            <p className={`font-bold ${timeLeft==0?'hidden':''}`}><span className="text-orange-400">Valid for</span> {minutes}:{seconds.toString().padStart(2,"0")}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <Link className="me-1 w-1/2" to={'/'}>
                                <button onClick={(e)=>enableMouse(e)}  type="reset" className="hover:text-orange-400 w-full hover:bg-black transition duration-300 uppercase bg-orange-400 text-black text-xs font-extrabold p-2 cursor-pointer rounded-lg">Cancel</button>
                            </Link>
                            <button type="submit" className="hover:text-orange-400 ms-1 w-1/2 hover:bg-black transition duration-300 uppercase bg-orange-400 text-black text-xs font-extrabold p-2 cursor-pointer rounded-lg">{timeLeft==0?'Resend':'Verify'}</button>
                        </div>
                    </form>
                </div>
            )
        }
        </>
    )
}
export default Verification;