import { AddCommentRequest, getCommentRequest, likeCommentRequest } from "../Model/Comment";
import { api } from "./api";

import { BackendError } from "./UserApi";
import { AxiosError } from "axios";

export const getAllCommentOfPost = async (accessToken: string, getCommentRequest: getCommentRequest) => {
    try {
        const response = await api.post(`comment/getComment`, getCommentRequest, {
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

export const addComment =  async (accessToken: string, userId: string | undefined, commentRequest: AddCommentRequest) => {
    try {
        const response = await api.post(`comment/` + userId, commentRequest, {
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

export const likeComment = async (accessToken: string | null, likeCommentRequest : likeCommentRequest) => {
    try {
        const response = await api.post(`comment/like`, likeCommentRequest,{
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