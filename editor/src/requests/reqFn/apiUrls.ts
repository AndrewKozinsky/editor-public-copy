import { MiscTypes } from 'types/miscTypes'


const addresses: MiscTypes.ObjStringKeyAnyVal = {
    // ВХОД, РЕГИСТРАЦИЯ И ПРОЧЕЕ СВЯЗАННОЕ С АВТОРИЗАЦИЕЙ
    // Получение токена пользователя
    getUserToken: 'users/getTokenData',
    // Вход пользователя. В ответ сервер отправляет токен авторизации.
    login: 'users/login',
    // Регистрация
    signup: 'users/signup',
    // Отправка письма со ссылкой на подтверждение почты
    sendConfirmLetter: 'users/sendConfirmLetter',
    // Подтверждение почты
    confirmEmail: function (confirmEmailToken: string) {
        return 'users/confirmEmail/' + confirmEmailToken
    },
    // Изменение почты
    changeEmail: 'users/changeEmail',
    // Изменение пароля
    changePassword: 'users/changePassword',
    // Сброс пароля
    resetPassword: 'users/resetPassword',
    // Отправка нового пароля вместо сброшенного
    changeResetPassword: function (resetPasswordToken: string) {
        return 'users/resetPassword/' + resetPasswordToken
    },
    // Текущий пользователь
    me: 'users/me',


    // САЙТЫ
    // Сайты
    sites: 'sites',
    // Конкретный сайт
    site: function (siteId: string) {
        return 'sites/' + siteId
    },


    // SITE COMPONENTS
    // Компоненты сайта
    siteComponents: function (siteId: string) {
        return 'sites/' + siteId + '/components'
    },


    // SITE INC FILES TEMPLATES
    // Шаблоны подключаемых файлов
    incFiles: function (siteId: string, incFilesId?: string) {
        if (incFilesId) return 'sites/' + siteId + '/incFiles/' + incFilesId
        else return 'sites/' + siteId + '/incFiles'
    },

    // Папки шаблонов компонентов
    componentsFolders: function (siteId: string) {
        return 'componentsFolders/' + siteId
    },
    // Шаблон компонента
    component: function (uuid?: string) {
        if (uuid) return 'components/' + uuid
        else return 'components/'
    },
    // Папки статей
    articlesFolders: function (siteId: string) {
        return 'articlesFolders/' + siteId
    },
    // Статья
    article: function (uuid?: string) {
        if (uuid) return 'articles/' + uuid
        else return 'articles/'
    },
}


// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
function getApiUrl(url: string, ...args: any[]): string {

    if (addresses[url]) {
        if (typeof addresses[url] === 'string') {
            return '/api2/' + addresses[url]
        }
        else {
            return '/api2/' + addresses[url](...args)
        }
    }

    // @ts-ignore
    const x: never = null
}

export default getApiUrl