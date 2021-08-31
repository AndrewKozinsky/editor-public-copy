import { IUser } from '../../models/user'

// Объект с данными о пользователе отправляемые после его регистрации
export type sendingUserDataType = Exclude<IUser, ['password', 'emailConfirmToken', '__v']>


