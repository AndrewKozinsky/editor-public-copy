import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class ResetPasswordDto {
    @MaxLength( 100, {message: 'user_ResetPasswordDto_emailTooLong'})
    @IsEmail({}, {message: 'user_ResetPasswordDto_itIsNotEmail'})
    @IsNotEmpty({message: 'user_ResetPasswordDto_emailIsEmpty'})
    readonly email: string
}
