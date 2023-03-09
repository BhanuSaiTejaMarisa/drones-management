import { useState } from "react"
const useToken = () => {
    const [token, setTokenInterval] = useState(() => {
        return localStorage.getItem("token")
    })

    const setToken = newToken => {
        localStorage.setItem("token", newToken);
        setTokenInterval(newToken);
    }
    return [token, setToken]
}

export default useToken