export type Message = {
    content: string;
    sender: string;
    recipient: string;
    timestamp: string;
}

export type MessageCustom = {
    id: string,
    senderId: string,
    content: string,
    timestamp: string,
    seen: boolean,
    senderAvatar: string,
    senderUrl: string
}

export type BotMessagesResponse = {
    id: string
    userId: string
    message: string
    response: string
    sendAt: string
    receiveAt: string
}

export type BotMessageRequest = {
    message : string
}

export type MessageRequest= {
    content: string;
    recipientId: string;
    senderId: string;
}

