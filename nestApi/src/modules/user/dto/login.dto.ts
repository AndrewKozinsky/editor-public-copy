import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class LoginDto {
    @MaxLength( 100, {message: 'user_LoginDto_emailTooLong'})
    @IsEmail({}, {message: 'user_LoginDto_itIsNotEmail'})
    @IsNotEmpty({message: 'user_LoginDto_emailIsEmpty'})
    readonly email: string

    @Length(6, 50, {message: 'user_LoginDto_passwordIsOutOfRange'})
    @IsNotEmpty({message: 'user_LoginDto_passwordIsEmpty'})
    readonly password: string
}
