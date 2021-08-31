namespace MiscTypes {
    export type Language = 'eng' | 'rus'

    // Объект с данными токена
    export type JWTDecoded = {
        id: string, iat: number, exp: number
    }

    /** Тип объекта с со строковыми ключами и строковыми значениями */
    export type ObjStringKeyStringVal = {[key: string]: string}
}

export default MiscTypes
