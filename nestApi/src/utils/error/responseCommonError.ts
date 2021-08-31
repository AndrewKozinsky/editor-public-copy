import { ErrorResponseInterface } from './errorResponse.interface'
import { HttpException, HttpStatus } from '@nestjs/common'

export default function responseCommonError(
    errMessage: string,
    statusCode: number = HttpStatus.UNPROCESSABLE_ENTITY
): void {
    const responseBody: ErrorResponseInterface = {
        status: 'fail',
        statusCode,
        commonError: errMessage
    }

    throw new HttpException(responseBody, statusCode)
}
