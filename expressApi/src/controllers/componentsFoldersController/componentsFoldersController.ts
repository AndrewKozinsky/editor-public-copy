import { Response, NextFunction } from 'express'
import { catchAsync } from '../../errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import {AppError} from '../../errors/appError'
import ComponentsFoldersModel from '../../models/componentsFolders';


/** Получение порядка расположения шаблонов компонентов определённого сайта (защищённый маршрут) */
export const getFolders = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали id сайта, то возвратить ошибочный ответ
    if (!req.params.siteId) {
        return next(
            new AppError(null, '{{componentsFoldersController.getComponentsFoldersNoSiteId}}', 400)
        )
    }

    // Получение порядка шаблонов компонентов сайта с переданным id
    const folders = await ComponentsFoldersModel
        .findOne({siteId: req.params.siteId})
        .select('-__v -_id')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            folders
        }
    })
})


/** Изменение свойства content в порядке шаблонов компонентов (защищённый маршрут)
 * В запросе должен передаваться JSON вида: {content: [{...}]}
 * */
export const setFolders = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Повторно найти объект порядка и обновить его данные
    const updatedFolders = await ComponentsFoldersModel.findOneAndUpdate(
        {siteId: req.params.siteId},
        {content: req.body.content},
        {new: true, useFindAndModify: false}
    ).select('-__v -_id')

    // Если порядок не найден, то возвратить ошибочный ответ
    if (!updatedFolders) {
        return next(
            new AppError(null, '{{componentsFoldersController.updateComponentsFoldersFoldersNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            folders: updatedFolders
        }
    })
})
