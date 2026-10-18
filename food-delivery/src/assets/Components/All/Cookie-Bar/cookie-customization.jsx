import { Link,useNavigate } from "react-router-dom";
import { useCookieContext } from "../../Contexts/CookieContext";

function CookieCustomization()
{
    const {setShowCookie} = useCookieContext();
    const navigate = useNavigate();
    function CookieCustomize(e)
    {
        e.preventDefault();

        const Necessary_cookies = document.getElementById("necessary-cookies").checked;
        const Functional_cookies = document.getElementById("functional-cookies").checked;
        const Analytics_cookies = document.getElementById("analytics-cookies").checked;
        const Targetting_cookies = document.getElementById("targetting-cookies").checked;

        if(Necessary_cookies || Functional_cookies || Analytics_cookies || Targetting_cookies)
        {
            document.cookie = "CookieValue=Stored; max-age=31536000; path=/";
            setShowCookie(false);
            navigate("/");
        }
        else
        {
            document.cookie = "CookieValue=Removed; max-age=31536000; path=/";
            setShowCookie(false);
            navigate("/");
        }
    }
    return(
        <form onSubmit={CookieCustomize} className="bg-amber-100 border border-orange-400 rounded-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 pb-10">
            <p className="text-2xl font-bold my-5 text-orange-400 underline">Customize the Cookies</p>
            <div className="space-y-5">
                <div>
                    <label className="flex space-x-2 font-bold cursor-pointer">
                        <input id="necessary-cookies" type="checkbox" className="accent-orange-400 cursor-pointer"/>
                        <p className="text-sm">Strictly Necessary Cookies</p>
                    </label>
                </div>
                <div>
                    <label className="flex space-x-2 font-bold cursor-pointer">
                        <input id="functional-cookies" type="checkbox" className="accent-orange-400 cursor-pointer"/>
                        <p className="text-sm">Functional Cookies</p>
                    </label>
                </div>
                <div>
                    <label className="flex space-x-2 font-bold cursor-pointer">
                        <input id="analytics-cookies" type="checkbox" className="accent-orange-400 cursor-pointer"/>
                        <p className="text-sm">Analytics / Performance Cookies</p>
                    </label>
                </div>
                 <div>
                    <label className="flex space-x-2 font-bold cursor-pointer">
                        <input id="targetting-cookies" type="checkbox" className="accent-orange-400 cursor-pointer"/>
                        <p className="text-sm">Targetting / Advertising Cookies</p>
                    </label>
                </div>
                <div className="w-full space-x-2 flex">
                    <Link to={'/'} className="w-1/2">
                        <button className="bg-orange-400 w-full font-bold py-1 px-3 rounded-md hover:bg-black hover:text-orange-400 transition duration-300 cursor-pointer">Cancel</button>
                    </Link>
                    <button type="submit" className="bg-orange-400 w-1/2 font-bold py-1 px-3 rounded-md hover:bg-black hover:text-orange-400 transition duration-300 cursor-pointer">Save</button>
                </div>
            </div>
        </form>
    )
}
export default CookieCustomization;