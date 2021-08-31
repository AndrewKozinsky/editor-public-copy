import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as articleController from '../controllers/articleController/articleController'


const router = Router()

router.route('/')
    .post(authController.protect, articleController.createArticle)

// uuid — это свойство uuid в документе компонента
router.route('/:uuid')
    // Получение шаблона компонента определённого сайта
    .get(authController.protect, articleController.getArticle)
    // Изменение шаблона компонента определённого сайта
    .patch(authController.protect, articleController.updateArticle)
    // Удаление шаблона компонента определённого сайта
    .delete(authController.protect, articleController.deleteArticle)


export default router