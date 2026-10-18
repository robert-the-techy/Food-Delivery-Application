import { createContext, useContext, useState } from "react";

const createTokenContext = createContext();

export function TokenContext({children})
{
    const [accessToken,setAccessToken] = useState('');
    return(
        <createTokenContext.Provider value={{accessToken,setAccessToken}}>
            {children}
        </createTokenContext.Provider>
    )
}

export function useTokenContext()
{
    return useContext(createTokenContext)
}