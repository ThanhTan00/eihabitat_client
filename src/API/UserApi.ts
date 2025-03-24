import axios, { AxiosError } from "axios"
import { ApiResponse } from "../Model/APIResponse"
import { followRequest, User, UserCreationRequest, UserUpdate } from "../Model/User"
import { api } from "./api"

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

export const authenticateWithGG = async (email: string | null, token: string | null) => {
    try {
        const response = await api.post('auth/loginWithGG/'+ email + "/" + token);
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

export const loginWithGG = async () => {
    try {
        const response = await axios.get(window.location.href = "http://14.225.253.213:8080/oauth2/authorization/google");
        //const response = await axios.get(window.location.href = "http://localhost:8080/oauth2/authorization/google");
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

export const createNewAccountWithGG = async () => {
    try {
        const response = await api.get('auth/loginWithGoogle');
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

export const getMyInfo = async (accessToken: string) => {
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

export const getUserInfo = async (accessToken: string, userProfileName: string, rootUser: string | undefined) => {
    try {
        const response = await api.get('users/' + userProfileName + "/" + rootUser, {
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

export const getUserDemo = async (email: string) => {
    try {
        const response = await api.get('users/demo/' + email)
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

export const getAllFollowers = async (accessToken: string, userProfileName: string | null, rootUserId: string | undefined) => {
    try {
        const response = await api.get('follow/'+userProfileName+'/followers/'+rootUserId, {
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

export const getAllFollowings = async (accessToken: string, userProfileName: string | null, rootUserId: string | undefined) => {
    try {
        const response = await api.get('follow/'+userProfileName+'/following/' + rootUserId, {
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

export const followUser = async (accessToken: string | null, followRequest : followRequest) => {
    try {
        const response = await api.post('follow',followRequest,{
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

export const unFollowUser = async (accessToken: string | null, followRequest : followRequest) => {
    try {
        const response = await api.post('follow/unfollow',followRequest,{
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

export const updateUserAvatar = async (accessToken: string | null, userId: string | undefined, formData : FormData) => {
    try {
        const response = await api.post('users/avatar/'+userId,formData,{
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

export const searchUser = async (accessToken: string | null, profileName: string) => {
    try {
        const response = await api.get('users/search/' + profileName, {
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

export const suggestFollow = async (accessToken: string | null, userId: string) => {
    try {
        const response = await api.get('follow/suggestions/' + userId, {
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

export const suggestFollowByFollowedMe = async (accessToken: string | null, userId: string) => {
    try {
        const response = await api.get('follow/followedMeSuggestions/' + userId, {
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

export const getAllChatRoom = async (accessToken: string | null, userId: string) => {
    try {
        const response = await api.get('chat/conversations/' + userId, {
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

export const getChatHistory = async (accessToken: string | null, senderId: string, recipientId: string) => {
    try {
        const response = await api.get('chat/history/' + senderId +"/"+recipientId, {
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

export const getUserDemoForChatRoom = async (accessToken: string, id: string) => {
    try {
        const response = await api.get('users/chatRoom/' + id, {
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

