export type Message = {
    content: string;
    sender: string;
    recipient: string;
    timestamp: string;
}

export type MessageCustom = {
    id: string,
    senderId: string,
    recipientId: string,
    content: string,
    timestamp: string,
    read: boolean
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
    senderId: string;
    recipientId: string;
}

