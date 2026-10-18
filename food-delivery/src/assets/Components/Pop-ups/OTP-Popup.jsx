import { useRef,useEffect, useState } from "react";
import LoginErrors from "../Error-Message/login-errors";

function OTPPopup({otp_show,otp_hide,code,change_show})
{
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

    useEffect(() => 
    {
        askOTP();

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => window.history.pushState(null, "", window.location.href);

        document.body.style.pointerEvents = "none";
        document.getElementById("otp-form").style.pointerEvents = "auto";

        // timeout is a fallback in case your `otp-out` class is still animating in
        const focusTimer = setTimeout(() => ownUseRef.current[0]?.focus(), 100);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) clearInterval(timer);
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(focusTimer);
            clearInterval(timer);
            window.onpopstate = null;
            document.body.style.pointerEvents = "auto";
        };
    }, []);

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
        const response = await fetch("http://localhost:8080/authenticate/send-password-change-otp",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({userCode:code}),
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
                body:JSON.stringify({userCode:code,userOTP:otp}),
            }
        );

        if(response.ok)
        {
            enableMouse();
            otp_hide?.();
            change_show?.();
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

    function closePopup(e)
    {
        e.preventDefault();
        enableMouse();
        otp_hide?.();
    }

    return(
        <div id="otp-form" className={`${otp_show} shadow-lg border border-gray-300 sure-in rounded-lg box-border bg-white h-fit w-100`}>

            <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

            <form onSubmit={formHandleFunction} className="box-border flex flex-col w-full h-full text-black justify-between items-center space-y-8 p-5">
                <div className="w-full flex justify-center items-center space-x-1">
                    <i className="fa-regular fa-circle-check font-bold text-green-600"></i>
                    <p className="text-sm font-bold text-green-600">An OTP has sent to you email</p>
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
                                className="bg-green-100 shadow-md p-1 rounded-lg h-10 w-10 text-center outline-none focus:border-2 focus:border-green-500 text-lg font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    <p className={`font-bold ${timeLeft==0?'hidden':''}`}><span className="text-green-600">Valid for</span> {minutes}:{seconds.toString().padStart(2,"0")}</p>
                </div>
                <div className="flex justify-between w-full items-center space-x-5">
                    <button onClick={(e)=>closePopup(e)}  type="reset" className="w-1/2 uppercase bg-linear-to-br from-red-300 via-red-600 to-red-900 text-white text-xs font-extrabold p-2 cursor-pointer rounded-lg">Cancel</button>
                    <button type="submit" className="w-1/2 uppercase bg-linear-to-br from-green-300 via-green-600 to-green-900 text-white text-xs font-extrabold p-2 cursor-pointer rounded-lg">{timeLeft==0?'Resend':'Verify'}</button>
                </div>
            </form>
        </div>
    )
}
export default OTPPopup;