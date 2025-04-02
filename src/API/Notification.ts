import { BackendError } from "./UserApi";
import { AxiosError } from "axios";
import { api } from "./api";

export const getNotifications = async (accessToken: string, userProfileName: string | undefined) => {
    try {
        const response = await api.get(`notification/top10/${userProfileName}`, {
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

export const markNotificationsAsSeen = async (accessToken: string, notificationIds: string[]) => {
    try {
        const response = await api.post(`notification/seen` , notificationIds, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json" 
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
};