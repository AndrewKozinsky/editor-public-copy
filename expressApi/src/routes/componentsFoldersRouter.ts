import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as componentsFoldersController
    from '../controllers/componentsFoldersController/componentsFoldersController'


const router = Router()

router.route('/:siteId')
    // Получение порядка расположения шаблонов компонентов определённого сайта
    .get(authController.protect, componentsFoldersController.getFolders)
    // Изменение порядка расположения шаблонов компонентов определённого сайта
    .put(authController.protect, componentsFoldersController.setFolders)


export default router