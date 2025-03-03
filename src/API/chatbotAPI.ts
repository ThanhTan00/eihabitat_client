import { BotMessageRequest } from "../Model/Message";
import { botApi } from "./api";

export const sendMessage = async ( message: BotMessageRequest) => {
    try {
        const response = await botApi.post('', message)
        return response.data
    } catch (error) {
        throw new Error("an error has occured!")
    }
}