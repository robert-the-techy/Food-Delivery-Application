import { useRef,useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginErrors from "../../Error-Message/login-errors";
import { useLoginContext } from "../../Contexts/LoginContext";
import { useTokenContext } from "../../Contexts/TokenContext";

function OTP()
{
    const navigate = useNavigate();
    const location = useLocation();
    const {accessToken,setAccessToken} = useTokenContext();

    const [timeLeft,setTimeLeft] = useState(5*60);

    const [otp,setOTP] = useState(["","","",""]);
    const ownUseRef = useRef([]);

    function handleChange(digit,index)
    {
        const oneDigit = digit.slice(-1);

        const newOTP = [...otp];
        newOTP[index] = oneDigit;
        setOTP(newOTP);

        if(oneDigit && index < 3)
        {
            ownUseRef.current[index+1].focus();
        }
    }

    function handleKey(key,index)
    {
        if(key.key == "Backspace" && !otp[index] && index > 0)
        {
            ownUseRef.current[index-1].focus();
        }

        if(key.key == "ArrowLeft" && index > 0)
        {
            ownUseRef.current[index-1].focus();
        }

        if(key.key == "ArrowRight" && index < 3)
        {
            ownUseRef.current[index+1].focus();
        }
    }

    const {setIsLoggedIn} = useLoginContext();

    useEffect(()=>
    {
        if(!location.state?.userCode)
        {
            logout();
        }

        document.body.style.pointerEvents = "none";
        document.getElementById("otp-form")?.style.setProperty("pointer-events", "auto");

        return () => 
        {
            document.body.style.pointerEvents = "auto";
        };


    },[location.state?.userCode, navigate, setIsLoggedIn]);

    // Logout Mechanism
    async function logout() 
    {
        const response = await fetch("http://localhost:8080/authenticate/admin/logout",
        {
            method: "POST",
            credentials: "include",
        });

        if(!response.ok)
        {
            setErrorSet('* something went wrong!');
            seterrorMessage('come-out');
        }
        else
        {
            setAccessToken(null);
            setIsLoggedIn(false);
            sessionStorage.clear();
            localStorage.removeItem("accessToken");
            navigate("/*", { replace: true });
        }
    }


    // Mouse Event Handling
    useEffect(()=>
    {
        window.history.pushState(null, "", window.location.href);

        window.onpopstate = () => 
        {
            window.history.pushState(null, "", window.location.href);
        }

        document.body.style.pointerEvents='none';
        document.getElementById('otp-form').style.pointerEvents='auto';

        ownUseRef.current[0]?.focus();

        if(!accessToken) return;

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
        return ()=>clearInterval(timer);
    },[accessToken]);

    function enableMouse(e)
    {
        document.body.style.pointerEvents='auto';
    }


    const [errorset,setErrorSet] = useState('');

    const [errorMessage,seterrorMessage] = useState('go-in');


    function formHandleFunction(e)
    {
        e.preventDefault();

        if(timeLeft==0)
        {
            setOTP(["","","",""]);
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

            askOTP();
        }
        else
        {
            e.preventDefault();

            let enteredOTP = '';

            otp.forEach((no)=>
            {
                enteredOTP += no;
            })

            if(enteredOTP!="" && enteredOTP.length == 4)
            {
                verifyOTP(enteredOTP);
            }
            else if(enteredOTP == "")
            {
                setErrorSet('* empty OTP can not be accepted!');
                seterrorMessage('come-out');
            }
            else if(enteredOTP.length < 4)
            {
                setErrorSet('* OTP must have 4 digits!');
                seterrorMessage('come-out');
            }
        }
    };

    async function askOTP()
    {
        const response = await fetch("http://localhost:8080/authenticate/send-login-otp",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({userCode:location.state?.userCode}),
        }
        );

        if(!response.ok)
        { 
            setErrorSet("* something went wrong!");
            seterrorMessage('come-out');
        }
    }

    async function verifyOTP(otp)
    {
        const response = await fetch("http://localhost:8080/authenticate/verify-otp",
            {
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({userCode:location.state?.userCode,userOTP:otp}),
            }
        );

        if(response.ok)
        {
            enableMouse();
            setIsLoggedIn(true);

            navigate("/admin/dashboard");
        }
        else if(response.status == 401)
        {
            setErrorSet('* invalid OTP!');
            seterrorMessage('come-out');
        }
        else
        {
            setErrorSet('* something went wrong!');
            seterrorMessage('come-out');
        }
    }

    const minutes = String(Math.floor(timeLeft/60));
    const seconds = String(timeLeft%60);

    return(
        <div id="otp-form" className="border w-95 h-fit transition duration-500 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">

            <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

            <form onSubmit={formHandleFunction} className="box-border flex flex-col w-full h-full text-black justify-between items-center px-12 py-10 space-y-8">
                <div className="w-full flex justify-center items-center space-x-1">
                    <i className="fa-regular fa-circle-check font-bold"></i>
                    <p className="text-sm font-bold">An OTP has sent to you email</p>
                </div>
                <div className="w-full flex justify-between">
                    {
                        otp.map((number,index)=>
                        {
                            return(
                                <input

                                key={index}
                                value={number}
                                type="number" 
                                className="bg-amber-100 shadow-md p-1 rounded-lg h-10 w-10 text-center outline-none focus:border-2 focus:border-orange-400 text-lg font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    <Link className="me-1 w-1/2" to={'/login'}>
                        <button onClick={(e)=>enableMouse(e)}  type="reset" className="hover:text-orange-400 w-full hover:bg-black transition duration-300 uppercase bg-orange-400 text-black text-xs font-extrabold p-2 cursor-pointer rounded-lg">Cancel</button>
                    </Link>
                    <button type="submit" className="hover:text-orange-400 ms-1 w-1/2 hover:bg-black transition duration-300 uppercase bg-orange-400 text-black text-xs font-extrabold p-2 cursor-pointer rounded-lg">{timeLeft==0?'Resend':'Verify'}</button>
                </div>
            </form>
        </div>
    )
}
export default OTP;