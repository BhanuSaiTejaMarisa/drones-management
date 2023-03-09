

import { useEffect, useState } from 'react'
import useToken from './useToken'

const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        if (!token) return null;

        const encodedPayload = token.split(".")[1];
        return JSON.parse(atob(encodedPayload))
    }
    const [user, setUser] = useState(() => {
        return getPayloadFromToken(token)
    })

    useEffect(() => {
        setUser(getPayloadFromToken(token))
    }, [token])
    return user;
}

export default useUser