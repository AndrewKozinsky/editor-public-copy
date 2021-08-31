import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    PipeTransform,
    ValidationError
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ErrorResponseInterface } from './errorResponse.interface'

export class BackendValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value)

        // Return function if object is not object. Otherwise it will break code below
        if (typeof object !== 'object') return value

        const errors = await validate(object)

        if (errors.length === 0) {
            return value
        }

        throw new HttpException(this.formatErrors(errors), HttpStatus.UNPROCESSABLE_ENTITY)
    }

    formatErrors(errors: ValidationError[]): ErrorResponseInterface {
        const errorsObj = errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints)
            return acc
        }, {})

        return {
            status: 'fail',
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: errorsObj
        }
    }
}
