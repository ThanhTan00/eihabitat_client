import { BotMessageRequest } from "../Model/Message";
import { api } from "./api";

export const sendMessage = async (userId: string | undefined, message: BotMessageRequest) => {
    try {
        const response = await api.post('api/chat/chatBot/'+userId, message)
        return response.data
    } catch (error) {
        throw new Error("an error has occured!")
    }
}

export const getChatBotHistory = async (userId: string | undefined) => {
    try {
        const response = await api.get('api/chat/chatBot/'+userId)
        return response.data
    } catch (error) {
        throw new Error("an error has occured!")
    }
}