import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'


// Middleware
@Injectable()
export class LanguageMiddleware implements NestMiddleware {

    use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if (!req.headers['Editor-Language']) {
            req.headers['Editor-Language'] = 'eng'
        }
        next()
    }
    // DELETE THIS
    use(req: any, res: Response, next: NextFunction) {
        next()
    }
}
