import { Injectable, NestMiddleware } from '@nestjs/common'
import { ExpressRequestInterface } from '../../../types/expressRequest.interface'
import { NextFunction, Response } from 'express'
import MiscTypes from '../../../types/miscTypes'
import { config } from '../../../config'
import { UserService } from '../user.service'
import { verify } from 'jsonwebtoken'

// The middleware sets user property to Request with user's data
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        const token = req.cookies.token || req.headers?.authorization?.split(' ')[1]

        if (!token) {
            req.user = null
            next()
            return
        }

        try {
            // Расшифровать JWT и получить payload
            const decodedJWT: MiscTypes.JWTDecoded = await verify(token, config.jwtSecret)

            // Get user by id
            const user = await this.userService.getUserById( parseInt(decodedJWT.id) )
            if (!user) throw new Error('User not found')

            req.user = user
            next()
        }
        catch (err) {
            req.user = null
            next()
        }
    }
}
