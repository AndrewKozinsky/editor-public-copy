import { Response, NextFunction } from 'express'
import { catchAsync } from '../../errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import {AppError} from '../../errors/appError'
import ComponentModel from '../../models/component'


/** [POST] api/component
 * Создание шаблона компонента (защищённый маршрут)
 * В body нужно передавать объект вида:
 * {uuid: 'fu4d573g26gs3455', siteId: "60b45a889edf5b0029eb31eb", code: 'some_code'}
 */
export const createComponent = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали id сайта, то возвратить ошибочный ответ
    if (!req.body.siteId) {
        return next(
            new AppError(null, '{{componentController.getComponentNoSiteId}}', 400)
        )
    }

    // Если не передали названия компонента, то возвратить ошибочный ответ
    if (!req.body.name) {
        return next(
            new AppError(null, '{{componentController.getComponentNoName}}', 400)
        )
    }

    const uuid: string = req.body.uuid.toString()
    const siteId: string = req.body.siteId.toString()

    // Создание нового шаблона компонента
    const newComponent = await ComponentModel.create({
        uuid,
        userId: req.user?.id,
        siteId,
        name: req.body.name,
        code: req.body.code || null,
    })

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            component: {
                id: newComponent._id,
                uuid: newComponent.uuid,
                siteId: newComponent.siteId,
                name: newComponent.name,
                code: newComponent.code
            }
        }
    })
})

/** [GET] api/components/:uuid
 * Получение шаблона компонента (защищённый маршрут)
 */
export const getComponent = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получение шаблона компонента по переданному id
    const component = await ComponentModel
        .findOne({uuid: req.params.uuid})
        .select('-__v -_id -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            component
        }
    })
})


/** [PATCH] api/components/:uuid
 * Изменение свойства code у шаблона компонента (защищённый маршрут)
 * В body нужно передавать объект вида:
 * {"code": "some_code"}
 */
export const updateComponent = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти шаблон компонента и обновить его данные
    const updatedComponent = await ComponentModel.findOneAndUpdate(
        {uuid: req.params.uuid},
        req.body,
        {new: true, useFindAndModify: false}
    ).select('-__v -_id')

    // Если шаблон компонента не найден, то возвратить ошибочный ответ
    if (!updatedComponent) {
        return next(
            new AppError(null, '{{componentController.updateComponentComponentNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            component: updatedComponent
        }
    })
})


/** [DELETE] api/components/:uuid
 * Удаление шаблона компонента (защищённый маршрут)
 */
/** Удаление шаблона компонента (защищённый маршрут) */
export const deleteComponent = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Удалить шаблон компонента из БД
    await ComponentModel.findOneAndDelete(
        {uuid: req.params.uuid}
    )

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})
