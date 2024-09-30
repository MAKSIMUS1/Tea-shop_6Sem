import React, { useCallback, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import SocketAPI from "../http/SocketAPI";
import { useConnectSocket } from '../http/hooks/useConnectSocket';


const Chat = observer(() => {
    const [text, setText] = useState("");
    const {message} = useConnectSocket();

    const sendMessage = () => {
        SocketAPI.socket?.emit('server-path', {text});
    }

    return (
        <div>
            <h1>Chat</h1>
            <div>
                <input type="text" onChange={(e) => setText(e.currentTarget.value)}/>
                <button onClick={sendMessage}>
                    SEND
                </button>
            </div>

            <div>
                <h3>Messages</h3>
                {
                    message && JSON.parse(message).map(item => {
                        return (<h4>{item}</h4>);
                    })
                }
            </div>
        </div>
    );
});

export default Chat;
