import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const URL = "https://eihabitat.site/api/ws";
//const URL = "http://localhost:8080/ws";

const connectWebSocket = (
    user: string,
    onMessageReceived: (message: any) => void
): Client => {
    const client = new Client({
        brokerURL: undefined, // Use SockJS
        webSocketFactory: () => new SockJS(URL),
        onConnect: () => {
            console.log(`Connected as ${user}`);
            client.subscribe(`/topic/messages`, (msg) =>
                onMessageReceived(JSON.parse(msg.body))
            );
        },
    });
    client.activate();
    return client;
};

export default connectWebSocket;

