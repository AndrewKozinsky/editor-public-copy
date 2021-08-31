import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class ChangeEmailDto {

    @MaxLength( 100, {message: 'user_ChangeEmailDto_emailTooLong'})
    @IsEmail({}, { message: 'user_ChangeEmailDto_itIsNotEmail' })
    @IsNotEmpty({message: 'user_ChangeEmailDto_EmptyEmail'})
    readonly email: string
}
