import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { NotificationType } from "../Model/WebSocket";

//const URL = "https://eihabitat.site/api/ws";
const URL = "http://localhost:8080/ws";

const connectNotificationSocket = (
    userName: string | undefined,
    onNotificationReceived: (notification: NotificationType) => void
): Client => {
    const client = new Client({
        webSocketFactory: () => new SockJS(URL),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log(`✅ Connected to notifications as User: ${userName}`);
            client.subscribe(`/user/${userName}/notifications`, (msg) => {
                onNotificationReceived(JSON.parse(msg.body));
            });
        },
    });

    client.activate();
    return client;
};


export default connectNotificationSocket;

