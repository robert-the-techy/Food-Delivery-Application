import { createContext, useState, useContext } from "react";

const createLoginContext = createContext();

export function LoginContext({children})
{
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    return(
        <createLoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </createLoginContext.Provider>
    )
}

export function useLoginContext()
{
    return useContext(createLoginContext);
}