import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import api from "./api";
import { BackendError } from "./UserApi";
import { AxiosError } from "axios";



export const getAllPost = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    try {


        const response = await api.get(`post/user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response.data)

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