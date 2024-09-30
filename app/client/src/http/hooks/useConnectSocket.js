import {useEffect, useState } from "react";
import SocektApi from "../SocketAPI";

export const useConnectSocket = () => {
    const [message, setMessage] = useState()

    const connectSocket = () => {
        SocektApi.createConnection();

        SocektApi.socket?.on("client-path", (data) =>{
            console.log(data);
            if(JSON.stringify(data) != undefined) {
            setMessage(JSON.stringify(data));
        }
        })
    }

    useEffect(() => {
        connectSocket()
    }, [])

    return { message }
}