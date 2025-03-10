import { BackendError } from "./UserApi";
import { AxiosError } from "axios";
import {LikePostRequest, SavePostRequest } from "../Model/Post";
import { MessageRequest } from "../Model/Message";
import { api } from "./api";

export const getUserStories = async (accessToken: string, userId: string | undefined) => {
    try {
        const response = await api.get(`story/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            //console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`)

            return backendError;
        } else {
            console.log('An unexpected error occurred: ', error)
            throw new Error('An unexpected error occurred, please try agian later')
        }
    }
}