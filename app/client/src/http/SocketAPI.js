import io from "socket.io-client";

class SocketAPI {
    static socket = null;

    static createConnection() {
        this.socket = io(process.env.REACT_APP_API_URL);

        this.socket.on("connect", () => {
            console.log('connected');
            //this.socket?.emit('load-messages');
        });

        this.socket.on("disconnect", (e) => {
            console.log('disconnect');
        });
    }
}

export default SocketAPI;
