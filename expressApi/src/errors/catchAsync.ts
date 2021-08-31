import {Request, Response, NextFunction} from 'express'


type CatchAsyncFnType<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>
type CatchAsyncReturnType<T> = (req: Request, res: Response, next: NextFunction) => void

export function catchAsync<T>(fn: CatchAsyncFnType<T>): CatchAsyncReturnType<T> {
    return function (req: Request, res: Response, next: NextFunction): void {
        fn(req, res, next).then().catch(next)
    }
}
