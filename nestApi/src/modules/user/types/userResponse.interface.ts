import MiscTypes from "src/types/miscTypes"

export interface UserResponseInterface {
    status: 'success',
    statusCode: number,
    data: {
        user: {
            id: number,
            name: string,
            email: string,
            language: MiscTypes.Language,
            token: string
        }
    }
}
