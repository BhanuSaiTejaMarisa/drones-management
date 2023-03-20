

import { useEffect, useState } from 'react'
import useToken from './useToken'

const useUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [token,] = useToken();

    const getPayloadFromToken = token => {

        if (!token) return null;

        const encodedPayload = token.split(".")[1];
        if (typeof window !== 'undefined') {
            // console.log("window present normal call");
            return JSON.parse(atob(encodedPayload))
        }
        // in node js 
        // const base64Url = token.split('.')[1];
        // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // const decoded = Buffer.from(base64, 'base64').toString();
        // const jwtPayload = JSON.parse(decoded);
    }
    const [user, setUser] = useState(getPayloadFromToken(token))
    useEffect(() => {
        if (token) {
            // setIsLoading(true)
            const loginUser = getPayloadFromToken(token)
            setUser(loginUser)
            // setIsLoading(false)
            // console.log({ loginUser, token }, "useUser useFFect changed due to token change", getPayloadFromToken(token), token !== null);
        }
    }, [token])

    // console.log({ token }, "2 useUser hook outside", user);

    return { user, isLoading };
}

export default useUser