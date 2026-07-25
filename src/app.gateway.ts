import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket} from "socket.io";

@WebSocketGateway({
    cors: {
    // Explicitly allow local file origins and wildcards
    origin: '*', 
    credentials: false // Must be false when using wildcard '*'
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(@MessageBody() data: { deviceId: string; lat: number; lng: number }): void {
        this.logger.log(`Received data from device: ${data.deviceId}`);
        this.server.emit('msgToClient', data);
    }

    afterInit(server: Server) {
        this.logger.log(`WebSocket server initialized: ${server}`);
    }
    
    handleConnection(client: Socket, ...args: Socket[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    
}
