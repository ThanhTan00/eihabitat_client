import { z } from "zod";
import { Gender } from "./Enums/Gender";
import { Nationality } from "./Enums/Nationality";


const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"])
const NationalityEnum = z.enum(["VIE", "JAP", "KOR", "THAI"])

export const UserRequestSchema = z.object({
    profileName: z.string()
        .min(1, {message: "Profile Name is required"}),
    password: z.string()
        .min(6, {message: "Password must be at least 6 characters"}),
    firstName: z.string()
        .min(1, {message: "Firstname must not be empty"}),
    lastName: z.string()
        .min(1, {message: "Lastname must not be empty"}),
    email : z.string()
        .email({message: "Invalid email address"}),
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

export type UserCreationRequest = z.infer<typeof UserRequestSchema>

export type UserLoginRequest = z.infer<typeof UserRequestSchema>

export type User = {
    id: string
    profileName: string
    firstName: string 
    lastName: string 
    email: string
    gender: Gender
    phone: string
    address: string
    nationality: Nationality
    dateOfBirth: Date
    signupDate: Date
}