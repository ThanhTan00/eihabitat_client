import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { NotificationType } from "../Model/WebSocket";
import { MessageCustom } from "../Model/Message";

const URL = "https://eihabitat.site/api/ws";
//const URL = "http://localhost:8080/ws";

const connectChatSocket = (
    roomId: string | undefined,
    onMessageReceive: (message: MessageCustom) => void
): Client => {
    const client = new Client({
        webSocketFactory: () => new SockJS(URL),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log(`✅ Connected to chat as User: ${roomId}`);
            client.subscribe(`/user/${roomId}/chatRoom`, (msg) => {
                onMessageReceive(JSON.parse(msg.body));
            });
        },
    });

    client.activate();
    return client;
};


export default connectChatSocket;

