import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as componentController
    from '../controllers/componentController/componentController'


const router = Router()

router.route('/')
    // Создание шаблона компонента
    .post(authController.protect, componentController.createComponent)

// uuid — это свойство uuid в документе компонента
router.route('/:uuid')
    // Получение шаблона компонента определённого сайта
    .get(authController.protect, componentController.getComponent)
    // Изменение шаблона компонента определённого сайта
    .patch(authController.protect, componentController.updateComponent)
    // Удаление шаблона компонента определённого сайта
    .delete(authController.protect, componentController.deleteComponent)


export default router