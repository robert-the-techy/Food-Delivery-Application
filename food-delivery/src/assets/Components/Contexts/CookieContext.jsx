import { createContext,useContext, useState } from "react";

const createCookieContext = createContext();

export function CookieContext({children})
{
    const [showCookie,setShowCookie] = useState(false);

    return(
        <createCookieContext.Provider value={{showCookie,setShowCookie}}>
            {children}
        </createCookieContext.Provider>
    )
}

export function useCookieContext()
{
    return useContext(createCookieContext);
}