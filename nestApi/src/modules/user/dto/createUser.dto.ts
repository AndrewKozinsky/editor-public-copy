import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class CreateUserDto {
    readonly name: string

    // NEXT TIME CREATE FILE WITH CONSTANTS EMAIL MAX WITH OR PASSWORD MIN AND MAX WITH AND SO LONG.
    // AND USE IT IN ALL FILES

    @MaxLength( 100, {
        message: 'user_CreateUserDto_emailTooLong'
    })
    @IsEmail({}, { message: 'user_CreateUserDto_itIsNotEmail' })
    @IsNotEmpty({message: 'user_CreateUserDto_EmptyEmail'})
    readonly email: string

    @Length(6, 50, {message: 'user_CreateUserDto_passwordIsOutOfRange'})
    @IsNotEmpty({message: 'user_CreateUserDto_passwordIsEmpty'})
    readonly password: string
}
