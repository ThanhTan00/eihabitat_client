import { BackendError } from "./UserApi";
import { AxiosError } from "axios";
import { api } from "./api";


export const getAllChatRoom = async (accessToken: string | null, userId: string) => {
    try {
        const response = await api.get(`chat/chatRoom/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            return backendError;
        } else {
            console.log('An unexpected error occurred: ', error)
            throw new Error('An unexpected error occurred, please try agian later')
        }
    }
}

export const getChatHistory = async (accessToken: string | null, roomId: string) => {
    try {
        const response = await api.get(`chat/history/${roomId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            return backendError;
        } else {
            console.log('An unexpected error occurred: ', error)
            throw new Error('An unexpected error occurred, please try agian later')
        }
    }
}
