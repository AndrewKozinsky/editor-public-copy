import {Router} from 'express'
import * as authController from '../controllers/authController/authController'


const router = Router()

// Регистрация пользователя
router.post('/signup', authController.signUp)

// Подтверждение почты пользователя
router.get('/confirmEmail/:token', authController.confirmEmail)

// Вход пользователя
router.post('/login', authController.logIn)

// Отправка еще одного письма со ссылкой на подтверждение почты
router.post('/sendAnotherConfirmLetter', authController.sendAnotherConfirmLetter)

// Выход пользователя
router.route('/logout').get(authController.protect, authController.logOut)

// Получение данных токена
router.post('/getTokenData', authController.getTokenData)

// Отправка письма со ссылкой на сброс пароля
router.post('/resetPassword', authController.resetPassword)

// Сброс пароля
router.patch('/resetPassword/:token', authController.changeResetPassword)

// Изменение почты пользователя
router.route('/changeEmail').put(authController.protect, authController.changeEmail)

// Изменение пароля
router.route('/changePassword')
    .patch(authController.protect, authController.changePassword)

router.route('/me')
    // Удаление пользователя
    .delete(authController.protect, authController.deleteMe)




export default router