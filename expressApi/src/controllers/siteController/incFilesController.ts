import { Response, NextFunction } from 'express'
import { catchAsync } from '../../errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import SiteModel from '../../models/site'
import IncFilesTemplateModel from '../../models/incFilesTemplate'
import {AppError} from '../../errors/appError'



/** Get an included files template (protected route) */
export const getSiteIncFilesTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Get an included files template with passed id
    const template = await IncFilesTemplateModel.findOne
        ({siteId: siteId, _id: req.params.templateId})
        .select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template
        }
    })
})


/** Получение всех шаблонов определённого сайта (защищённый маршрут) */
export const getSiteIncFilesTemplates = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Получение всех шаблонов сайта с переданным id
    const templates = await IncFilesTemplateModel.find({siteId}).select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            templates
        }
    })
})


/** Создание шаблона (защищённый маршрут) */
export const createIncFilesTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Если не передали имя шаблона, то возвратить ошибочный ответ
    if (!req.body.name) {
        return next(
            new AppError('name', '{{incFilesTemplateController.createTemplateNoName}}', 400)
        )
    }

    // Создание нового шаблона
    let newTemplate = await IncFilesTemplateModel.create({
        name: req.body.name,
        userId: req.user.id,
        siteId: req.params.siteId.toString(),
        codeInHead: req.body.codeInHead || null,
        codeBeforeEndBody: req.body.codeBeforeEndBody || null
    })

    newTemplate.__v = undefined

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template: newTemplate
        }
    })
})


/** Изменение данных шаблона (защищённый маршрут) */
export const updateIncFilesTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти сайт и обновить его данные
    const updatedTemplate = await IncFilesTemplateModel.findByIdAndUpdate(
        req.params.templateId,
        req.body,
        {new: true}
    ).select('-__v')

    // Если не найден шаблон, то возвратить ошибочный ответ
    if (!updatedTemplate) {
        return next(
            new AppError('name', '{{incFilesTemplateController.updateTemplateNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template: updatedTemplate
        }
    })
})


/** Удаление шаблона (защищённый маршрут) */
export const deleteIncFilesTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Удалить шаблон из БД
    await IncFilesTemplateModel.findByIdAndDelete(
        req.params.templateId
    )

    // Проверю в сайтах, не стоит ли id удаляемого шаблона как id шаблона по умолчанию.
    // Если стоит, то очищу в сайте свойство defaultIncFilesTemplateId
    const siteWithThisTemplate = await SiteModel.findOne({defaultIncFilesTemplateId: req.params.templateId})
    if (siteWithThisTemplate) {
        await SiteModel.findByIdAndUpdate(
            siteWithThisTemplate._id,
            {defaultIncFilesTemplateId: null}
        )
    }

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})
