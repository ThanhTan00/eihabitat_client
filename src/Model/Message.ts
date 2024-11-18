export type Message = {
    content: string;
    sender: string;
    recipient: string;
    timestamp: string;
}

export type MessageRequest= {
    content: string;
    senderId: string;
    recipientId: string;
}