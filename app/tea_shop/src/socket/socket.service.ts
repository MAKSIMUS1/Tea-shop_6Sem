import { WebSocketGateway, OnGatewayConnection, ConnectedSocket, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';

let sockets = new Array<Socket>();
let messages = new Array<string>();

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class SocketGateway implements OnGatewayConnection {

    @SubscribeMessage('server-path')
    hadleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any): void{
        console.log(`dto: ${dto}`);
        const res = { type: 'semeType', dto };

        messages.push(dto.text);

        sockets.forEach(element => {
            element.emit("client-path", messages);
        });
    }

    handleConnection(client: Socket): void {
        console.log(client);
        console.log('CONNECTED');

        sockets.push(client);

        client.on("close", (evt) => {
            for (let i = 0; i < sockets.length; i++) {
                if (sockets[i] == evt.target) {
                    sockets = sockets.splice(i, 1);

                    break;
                }
            }
        });
    }
}
