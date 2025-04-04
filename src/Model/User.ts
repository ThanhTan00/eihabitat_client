import { z } from "zod";
import { Gender } from "./Enums/Gender";
import { Nationality } from "./Enums/Nationality";


const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"])
const NationalityEnum = z.enum(["VIE", "JAP", "KOR", "THAI"])

export const UserRequestSchema = z.object({
    profileName: z.string()
        .min(6, {message: "Profile Name is required"}),
    password: z.string()
        .min(6, {message: "Password must be at least 6 characters"}),
    firstName: z.string()
        .min(1, {message: "Firstname must not be empty"}),
    lastName: z.string()
        .min(1, {message: "Lastname must not be empty"}),
    email : z.string()
        .min(6, {message: "Invalid email"}),
    phone : z.string()
        .min(10 , { message: "Phone number must be at least 10 digits long"})
        .regex(/^[0-9]+$/, "Phone number must contain only digits").optional(),
    dateOfBirth: z.date()
        .refine((date) => date <= new Date(), {
            message: "Date of birth must be in the past"
        }).optional(),
    gender: GenderEnum.optional(),
    address: z.string().optional(),
    nationality: NationalityEnum.optional()
})

export const LoginRequestSchema = z.object({
    email: z.string()
    .min(6, {message: "username or email invalid, it should be at least 6 characters"}),
    password: z.string()
    .min(6, {message: "password must be at least 6 characters"})
})
export type UserCreationRequest = z.infer<typeof UserRequestSchema>

export type UserLoginRequest = z.infer<typeof UserRequestSchema>

export type User = {
    id: string
    profileName: string
    firstName: string 
    lastName: string 
    email: string
    profileAvatar : string
    bio: string
    gender: Gender
    phone: string
    address: string
    nationality: Nationality
    userUrl: string
    dateOfBirth: Date
    signupDate: Date
    followers: string
    following: string
    followMe: boolean
    followedByMe: boolean
}

export type UserUpdate = {
    firstName?: string | undefined
    lastName?: string | undefined
    profileName?: string | undefined
    bio?: string | undefined
    phone?: string | undefined
    gender?: Gender | undefined
    dateOfBirth?: Date | undefined
    address?: string | undefined
    nationality?: Nationality | undefined
};

export const UserUpdateRequestSchema = z.object({


    firstName: z.string()
        .min(1, { message: "First name must not be empty" }).optional(),
    lastName: z.string()
        .min(1, { message: "Last name must not be empty" }).optional(),
    profilename: z.string()
        .min(1, { message: "Last name must not be empty" }).optional(),
    bio: z.string()
       .optional(),
    phoneNumber: z.string()
        .min(10, { message: "Phone number must be at least 10 digits long" })
        .regex(/^[0-9]+$/, "Phone number must contain only digits").optional(),
    dateOfBirth: z.date()
        .refine((date) => date <= new Date(), {
            message: "Date of birth must be in the pass."
        }).optional(),
    gender: GenderEnum.optional(),
    address: z.string().optional(),
    nationality: NationalityEnum.optional()
});

export type UserDemoInfo = {
    id: string
    email: string
    profileName: string
    profileAvatar: string
    firstName: string
    lastName: string
    userUrl: string
}

export type Follower = {
    id: string
    profileName: string
    firstName: string
    lastName: string
    profileAvatar: string
    userUrl: string
    followers: number
    following: number
    followMe: boolean
    followedByMe: boolean
}

export type followRequest = {
    followerId: string | null
    followedId: string | null
}

export type SearchUserResponse = {
    id: string,
    firstName: string,
    lastName: string,
    profileName: string,
    profileAvatar: string,
    userUrl: string,
    followers: number
}

export type SuggestFollow = {
    id: string
    profileName: string
    profileAvatar: string
    userUrl: string
    followedBy: string
}

export type Room = {
    id: string,
    userId: string
    userName: string,
    userAvatar: string,
    lastMessage: string,
    lastSender: string,
    seen: boolean,
    timestamp: string
}

