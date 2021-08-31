import {Router} from 'express'
import app from '../app'
import * as authController from '../controllers/authController/authController'
import * as siteController from '../controllers/siteController/siteController'
import * as incFilesController from '../controllers/siteController/IncFilesController'


const router = Router()

// Sites routes
router.route('/')
    // Получение всех сайтов
    .get(authController.protect, siteController.getAllSites)
    // Создание сайта
    .post(authController.protect, siteController.createSite)

// Exact site
router.route('/:siteId')
    // Изменение данных сайта
    .patch(authController.protect, siteController.updateSite)
    // Удаление сайта
    .delete(authController.protect, siteController.deleteSite)

// Site included files templates
router.route('/:siteId/incFiles')
    // Получение всех шаблонов
    .get(authController.protect, incFilesController.getSiteIncFilesTemplates)
    // Создание шаблона
    .post(authController.protect, incFilesController.createIncFilesTemplate)

router.route('/:siteId/incFiles/:templateId')
    // Get an included files template
    .get(authController.protect, incFilesController.getSiteIncFilesTemplate)
    // Изменение данных шаблона
    .patch(authController.protect, incFilesController.updateIncFilesTemplate)
    // Удаление шаблона
    .delete(authController.protect, incFilesController.deleteIncFilesTemplate)

// CSite components templates
router.route('/:siteId/components')
    // Получение всех компонентов сайта
    .get(authController.protect, siteController.getSiteComponents)


export default router