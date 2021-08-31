import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import responseCommonError from '../../../utils/error/responseCommonError'

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequestInterface>()

        if (request.user) {
            return true
        }
        else {
            responseCommonError('authGuard_userIsNotAuthorized', HttpStatus.UNAUTHORIZED)
        }
    }
}
