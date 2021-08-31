import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class SendConfirmLetterDto {
    @MaxLength( 100, {message: 'user_SendConfirmLetterDto_emailTooLong'})
    @IsEmail({}, {message: 'user_SendConfirmLetterDto_itIsNotEmail'})
    @IsNotEmpty({message: 'user_SendConfirmLetterDto_emailIsEmpty'})
    readonly email: string
}
