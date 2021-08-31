import { Response, NextFunction } from 'express'
import { catchAsync } from '../../errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import {AppError} from '../../errors/appError'
import ArticleModel from '../../models/article'


/** [POST] api/article
 * Создание шаблона компонента (защищённый маршрут)
 * В body нужно передавать объект вида:
 * {uuid: 'fu4d573g26gs3455', siteId: "60b45a889edf5b0029eb31eb", code: 'some_code'}
 */
export const createArticle = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали id сайта, то возвратить ошибочный ответ
    if (!req.body.siteId) {
        return next(
            new AppError(null, '{{articleController.getArticleNoSiteId}}', 400)
        )
    }

    // Если не передали название статьи, то возвратить ошибочный ответ
    if (!req.body.name) {
        return next(
            new AppError(null, '{{articleController.getArticleNoName}}', 400)
        )
    }

    const uuid: string = req.body.uuid.toString()
    const siteId: string = req.body.siteId.toString()

    // Создание новой статьи
    const newArticle = await ArticleModel.create({
        uuid,
        userId: req.user?.id,
        siteId,
        name: req.body.name,
        code: req.body.code || null
    })

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            article: {
                id: newArticle._id,
                uuid: newArticle.uuid,
                siteId: newArticle.siteId,
                code: newArticle.code
            }
        }
    })
})

/** [GET] api/articles/:uuid
 * Получение статьи (защищённый маршрут)
 */
export const getArticle = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получение статьи по переданному id
    const article = await ArticleModel
        .findOne({uuid: req.params.uuid})
        .select('-__v -_id -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            article
        }
    })
})


/** [PATCH] api/articles/:uuid
 * Изменение свойства code у статьи (защищённый маршрут)
 * В body нужно передавать объект вида:
 * {"code": "some_code"}
 */
export const updateArticle = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти статью и обновить её данные
    const updatedArticle = await ArticleModel.findOneAndUpdate(
        {uuid: req.params.uuid},
        req.body,
        {new: true, useFindAndModify: false}
    ).select('-__v -_id')

    // Если статья не найдена, то возвратить ошибочный ответ
    if (!updatedArticle) {
        return next(
            new AppError(null, '{{articleController.updateArticleArticleNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            article: updatedArticle
        }
    })
})


/** [DELETE] api/articles/:uuid
 * Удаление шаблона компонента (защищённый маршрут)
 */
/** Удаление статьи (защищённый маршрут) */
export const deleteArticle = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Удалить статью из БД
    await ArticleModel.findOneAndDelete(
        {uuid: req.params.uuid}
    )

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})
