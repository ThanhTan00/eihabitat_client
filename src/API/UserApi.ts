import { AxiosError } from "axios"
import { ApiResponse } from "../Model/APIResponse"
import { User, UserCreationRequest, UserUpdate } from "../Model/User"
import api from "./api"

export interface BackendError {
    code: number
    message: string
}

export const createNewUser = async (user: UserCreationRequest) => {
    try {
        const response = await api.post('users', user)
            //console.log(response.data)

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

export const authenticate = async (email:string, password: string) => {
    try {
        const response = await api.post('auth/token', {email, password});
        //console.log(response)
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

export const getUserInfo = async (accessToken: string) => {
    try {
        const response = await api.get('users/myInfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
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

export const updateUserProfile = async (user: UserUpdate, accessToken: string | null): Promise<ApiResponse<User> | BackendError> => {
    try {
        const response = await api.put('users',user,{
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

export const logout = async ({token} : {token : string | null}) => {
    try {
        console.log(token)
        const response = await api.post('auth/logout', {token})
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`)

            return backendError;
        } else {
            console.log('An unexpected error occurred: ', error)
            throw new Error('An unexpected error occurred, please try agian later')
        }
    }
}