import { BackendError } from "./UserApi";
import { AxiosError } from "axios";
import {LikePostRequest, SavePostRequest } from "../Model/Post";
import { MessageRequest } from "../Model/Message";
import { api } from "./api";



export const getAllUserPost = async (accessToken: string, username: string) => {
    try {
        const response = await api.get(`post/username/${username}`, {
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

export const getSelectedPost = async (accessToken: string, id: string | undefined, rootUserId: string | undefined) => {
    try {
        const response = await api.get(`post/${id}/${rootUserId}`, {
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

// export const getNewsFeedPosts = async (accessToken: string, id: string | undefined, page : number | undefined, size:number) => {
//     try {
//         const response = await api.get(`post/newsFeedPosts/${page}/${size}/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         })
//         return response.data
//     } catch (error) {
//         const axiosError = error as AxiosError<BackendError>
//         if (axiosError.response && axiosError.response.data) {
//             const backendError = axiosError.response.data;
//             //console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`)

//             return backendError;
//         } else {
//             console.log('An unexpected error occurred: ', error)
//             throw new Error('An unexpected error occurred, please try again later')
//         }
//     }
// }

export const getNewsFeedPosts = async (accessToken: string, id: string | undefined, page: number) => {
    try {
        const response = await api.get(`post/newsFeedPosts/${page}/2/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`)

            return backendError;
        } else {
            console.log('An unexpected error occurred: ', error)
            throw new Error('An unexpected error occurred, please try again later')
        }
    }
}

export const likePost = async (accessToken: string | null, likePostRequest : LikePostRequest) => {
    try {
        const response = await api.post(`likes`, likePostRequest,{
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

export const createPost = async (accessToken: string | null, userId: string | undefined, formData: FormData) => {
    try {
        const response = await api.post(`post/`+userId, formData,{
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

export const addMessage =  async (accessToken: string, message: MessageRequest) => {
    try {
        const response = await api.post(`chat/send` , message, {
            headers: {
               "Content-Type": "application/json" 
            }
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

export const savePost = async (accessToken : string | null, savePostRequest: SavePostRequest) => {
    try {
        const response = await api.post(`savedPost`, savePostRequest,{
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

export const getTop4SavedPosts = async (accessToken : string | null, rootUserId: string | null) => {
    try {
        const response = await api.get(`savedPost/top4/`+rootUserId,{
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

export const getAllSavedPosts = async (accessToken : string | null, rootUserId: string | null) => {
    try {
        const response = await api.get(`savedPost/`+rootUserId,{
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

