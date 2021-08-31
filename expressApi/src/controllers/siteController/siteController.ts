import { Response, NextFunction } from 'express'
import { catchAsync } from '../../errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import SiteModel from '../../models/site'
import IncFilesTemplateModel from '../../models/incFilesTemplate'
import ComponentsFoldersModel from '../../models/componentsFolders'
import ComponentModel from '../../models/component'
import ArticlesFoldersModel from '../../models/articlesFolders'
import ArticleModel from '../../models/article'
import {AppError} from '../../errors/appError'


// SITES ===============================================================================================================

/** Получение всех сайтов (защищённый маршрут) */
export const getAllSites = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Получение всех сайтов пользователя
    const sites = await SiteModel.find({userId: req.user.id}).select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            sites
        }
    })
})


/** Создание сайта (защищённый маршрут) */
export const createSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Создание нового сайта
    const newSite = await SiteModel.create({
        name: req.body.name,
        userId: req.user.id,
    })

    // Создание данных по модели ComponentsFolders
    await ComponentsFoldersModel.create({
        userId: req.user?.id,
        siteId: newSite._id
    })

    // Создание данных по модели ArticlesFolders
    await ArticlesFoldersModel.create({
        userId: req.user?.id,
        siteId: newSite._id
    })

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            site: {
                id: newSite._id,
                name: newSite.name,
            }
        }
    })
})


/** Частичное изменение сайта (защищённый маршрут) */
export const updateSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Найти сайт и обновить его данные
    const updatedSite = await SiteModel.findByIdAndUpdate(
        req.params.siteId,
        req.body,
        {new: true}
    ).select('-__v')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            site: updatedSite
        }
    })
})


/** Удаление сайта (защищённый маршрут) */
export const deleteSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Удалить сайт из БД
    await SiteModel.findByIdAndDelete(
        req.params.siteId
    )

    // Удалить шаблоны подключения внешних файлов
    await IncFilesTemplateModel.deleteMany({siteId: req.params.siteId})

    // Удалить папки шаблонов компонентов
    await ComponentsFoldersModel.deleteMany({siteId: req.params.siteId})

    // Удалить шаблоны компонентов
    await ComponentModel.deleteMany({siteId: req.params.siteId})

    // Удалить папки статей
    await ArticlesFoldersModel.deleteMany({siteId: req.params.siteId})

    // Удалить статьи
    await ArticleModel.deleteMany({siteId: req.params.siteId})

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})


// COMPONENTS TEMPLATES ================================================================================================

/** Получение всех шаблонов компонентов сайта (защищённый маршрут) */
export const getSiteComponents = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId

    // Получение всех шаблонов компонентов сайта
    const components = await ComponentModel
        .find({siteId: req.params.siteId})
        .select('-__v -_id -userId')


    // Отправить успешный ответ
    res.status(200).json({
        status: 'success',
        data: {
            components
        }
    })
})
