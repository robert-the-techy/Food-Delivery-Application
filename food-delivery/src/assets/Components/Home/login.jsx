import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import LoginErrors from "../Error-Message/login-errors";
import { useTokenContext } from "../Contexts/TokenContext";
import LoadingBar from "../All/Animations/loadingbar";
import { useCookieContext } from "../Contexts/CookieContext";
import { useLoginContext } from "../Contexts/LoginContext";

function Login()
{
    const [userCode,setUserCode] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userRememberMe,setUserRememberMe] = useState(false);

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

    // Mouse Event Handling
    useEffect(()=>{
        document.body.style.pointerEvents='none';
        document.getElementById('login-form').style.pointerEvents='auto';
    },[]);
    function enableMouse()
    {
        document.body.style.pointerEvents='auto';
    }

    const [errorset,setErrorSet] = useState('');
    const [errorMessage,seterrorMessage] = useState('go-in');

    const navigate = useNavigate();
    const { setAccessToken } = useTokenContext()
    const { setShowCookie } = useCookieContext();

    function formHandle(e)
    {
        e.preventDefault();

        if(userCode == "" || userPassword == "")
        {
            setErrorSet('* fields should not be empty!');
            seterrorMessage('come-out');
        }

        if(userCode != "" && userPassword != "")
        {
            const cookie = document.cookie.split(";");
            for(let c of cookie)
            {
                const [key,value] = c.trim().split("=");

                if(key === "CookieValue" && value === "Removed" && userRememberMe)
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
                    loginResponse();
                    break;
                }
            }
        }
    }

    const [loading,setLoading] = useState(false);
    const [load,setLoad] = useState('loading-in');

    async function loginResponse()
    {
        setLoad('loading-out');
        setLoading(true);
        const userData =
        {
            userCode : userCode,
            userPassword : userPassword,
            userRememberMe : userRememberMe
        }
        try
        {
            const response = await fetch("http://localhost:8080/authenticate/admin/login",
            {
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json",
                },
                credentials:"include",
                body:JSON.stringify(userData),
            });

            if(response.ok)
            {
                const data = await response.json();

                setAccessToken(data.accessToken);

                localStorage.setItem("adminCode",data.adminCode);

                try
                {
                    const response2 = await fetch("http://localhost:8080/authenticate/send-login-otp",
                    {
                        method:"POST",
                        headers:
                        {
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({userCode:data.adminCode}),
                    }
                    );

                    if(!response2.ok)
                    { 
                        setErrorSet("* something went wrong!");
                        seterrorMessage('come-out');
                    }
                    if(response2.ok)
                    {
                        navigate("/otp",
                            {
                                state:
                                {
                                    userCode : data.adminCode,
                                }
                            },
                        );
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
            else if(response.status === 401)
            {
                const msg = await response.json();
                setErrorSet(msg.message);
                seterrorMessage('come-out');
                enableMouse();
            }
            else
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
            setLoad("loading-in");
            setLoading(false);
        }
    }

    const {setIsLoggedIn} = useLoginContext();

    const handleClose = async () => 
    {
        try 
        {
            await fetch("http://localhost:8080/authenticate/admin/logout", 
            {
                method: "POST",
                credentials: "include",
            });
        } 
        finally 
        {
            setAccessToken(null);
            setIsLoggedIn(false);
            enableMouse();
            navigate("/", { replace: true });
        }
    };

    function forgotPassword(e)
    {
        e.preventDefault();
        
        navigate("/forgotpassword");
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
                    <div id="login-form" className="border w-85 h-fit transition duration-500 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                        <button className="absolute right-1 cursor-pointer" onClick={handleClose}>
                            <i className="ri-close-large-line text-amber-300 text-md font-extrabold hover:text-black transition duration-300"></i>
                        </button>

                        <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

                        <form onSubmit={(e)=>formHandle(e)} className="box-border flex flex-col w-full h-full text-black justify-between items-center px-12 py-10 space-y-3">
                            <div className="w-full mb-8">
                                <p className="text-2xl font-mono font-extrabold text-center uppercase">Account log in</p>
                                <div className="text-xs flex italic space-x-1">
                                    <p>new user?</p>
                                    <Link to={'/signin'}>
                                        <button className="text-orange-400 underline cursor-pointer">sign in</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                <i className="ri-mail-fill"></i>
                                <input onChange={(e)=>setUserCode(e.target.value)} type="text" value={userCode} className="outline-none w-full text-xs" placeholder="employee code" autoFocus/>
                            </div>
                            <div className="w-full p-1 space-x-1 rounded-lg flex items-center bg-amber-100 shadow-md">
                                <i className="ri-lock-2-fill"></i>
                                <input onChange={(e)=>setUserPassword(e.target.value)} type={ptype} value={userPassword} className="outline-none w-full text-xs" placeholder="password"/>
                                <button type="button" className="cursor-pointer" onClick={(e)=>setpassvisible(e)}>
                                    <i className={`${passwordShow ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                                </button>
                            </div>
                            
                            <button onClick={forgotPassword} className="text-orange-400 underline cursor-pointer text-xs italic ms-auto">forgot password?</button>

                            <div className="w-full flex space-x-2 items-center">
                                <input type="checkbox" className="accent-amber-100 h-3" onChange={(e)=>setUserRememberMe(e.target.checked)} checked={userRememberMe}/>
                                <p className="text-xs">Remember me</p>
                            </div>
                            <button type="submit" className="mt-3 hover:text-orange-400 hover:bg-black transition duration-300 uppercase bg-orange-400 text-black w-full text-xs font-extrabold p-2 cursor-pointer rounded-lg">Log in</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
export default Login;