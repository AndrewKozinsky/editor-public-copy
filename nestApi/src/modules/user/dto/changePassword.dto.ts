import { IsNotEmpty, Length } from 'class-validator'

export class ChangePasswordDto {

    @Length(6, 50, {message: 'user_ChangePasswordDto_passwordIsOutOfRange'})
    @IsNotEmpty({message: 'user_ChangePasswordDto_currentPasswordIsEmpty'})
    readonly currentPassword: string

    @Length(6, 50, {message: 'user_ChangePasswordDto_passwordIsOutOfRange'})
    @IsNotEmpty({message: 'user_ChangePasswordDto_newPasswordIsEmpty'})
    readonly newPassword: string
}
