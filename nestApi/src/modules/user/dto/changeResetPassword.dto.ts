import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class ChangeResetPasswordDto {
    @Length(6, 50, {message: 'user_ChangeResetPasswordDto_passwordIsOutOfRange'})
    @IsNotEmpty({message: 'user_ChangeResetPasswordDto_passwordIsEmpty'})
    readonly password: string
}
