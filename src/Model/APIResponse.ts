export interface ApiResponse<T> {
    data: ApiResponse<string>
    code: number
    message: string
    result: T
}