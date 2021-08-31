
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

export const messages: messagesType = {
    // Модель User
    user: {
        emailRequired: {
            eng: 'Please provide a email.',
            rus: 'Укажите адрес почты.'
        },
        emailValidate: {
            eng: 'Please provide a valid email.',
            rus: 'Укажите правильный адрес почты.'
        },
        passwordRequired: {
            eng: 'Please provide a password.',
            rus: 'Укажите пароль.'
        },
        passwordMinLength: {
            eng: 'Password should be at least 6 characters.',
            rus: 'Пароль должен быть не короче 6 символов.'
        },
        passwordMaxLength: {
            eng: 'Password must not be longer than 50 characters.',
            rus: 'Пароль должен быть не длиннее 50 символов.'
        },
        langRequired: {
            eng: 'Please provide your language.',
            rus: 'Укажите язык интерфейса.'
        }
    },
    // Модель Site
    site: {
        nameRequired: {
            eng: 'Please provide a site name.',
            rus: 'Укажите название сайта.'
        },
        userIdRequired: {
            eng: 'Specify the id of the user who created the site.',
            rus: 'Укажите id пользователя который создал сайт.'
        },
    },
    // Модель IncFilesTemplate
    incFilesTemplate: {
        nameRequired: {
            eng: 'Please provide a template name.',
            rus: 'Укажите название шаблона.'
        },
        userIdRequired: {
            eng: 'Specify the id of the user who owns the site with this template.',
            rus: 'Укажите id пользователя которому принадлежит сайт с этим шаблоном.'
        },
        siteIdRequired: {
            eng: 'Specify the id of the site to which this template belongs.',
            rus: 'Укажите id сайта которому принадлежит этот шаблон.'
        },
        codeInHeadCodeMaxLength: {
            eng: 'The code cannot exceed 65000 characters.',
            rus: 'Код не может превышать 65000 символов.'
        },
        codeBeforeEndBodyCodeMaxLength: {
            eng: 'The code cannot exceed 65000 characters.',
            rus: 'Код не может превышать 65000 символов.'
        },
    },
    // Контроллер авторизации
    authController: {
        // getTokenData
        getTokenDataNoCorrectToken: {
            eng: 'Authorization token is either not transferred or is invalid.',
            rus: 'Токен авторизации или не передан или неправилен.'
        },
        // confirmEmail
        confirmEmailUserNotFound: {
            eng: 'Wrong email confirmation token was sent.',
            rus: 'Передан неверный токен подтверждения почты.'
        },
        confirmEmailIsConfirmed: {
            eng: 'Email is confirmed!',
            rus: 'Почта подтверждена.'
        },
        // login
        loginNoEmailOrPassword: {
            eng: 'Please provide email and password.',
            rus: 'Не передана почта или пароль'
        },
        loginWrongEmailOrPassword: {
            eng: 'Incorrect email or password',
            rus: 'Неверная почта или пароль'
        },
        loginConfirmEmail: {
            eng: 'Please, confirm your email.',
            rus: 'Пожалуйста, подтвердите почту перед тем, как войти'
        },
        // protect
        protectNoToken: {
            eng: 'You are not logged in! Please log in to to get access',
            rus: 'Авторизуйтесь чтобы просматривать эти данные.'
        },
        protectNoUser: {
            eng: 'The user belonging to this token does not longer exists.',
            rus: 'Пользователя с таким токеном не существует.'
        },
        protectPasswordChanged: {
            eng: 'User recently changed password! Please log in again.',
            rus: 'Пользователя недавно изменил пароль. Снова авторизуйтесь.'
        },
        // forgotPassword
        forgotPasswordNoUser: {
            eng: 'There is no user with this email address.',
            rus: 'Не найдено пользователя с такой почтой.'
        },
        forgotPasswordCanNotSendEmail: {
            eng: 'There was an error sending the email. Try again later.',
            rus: 'Не удалось отправить письмо. Попробуйте позже.'
        },
        forgotPasswordEmailHasBeenSent: {
            eng: 'Email has been sent!',
            rus: 'Письмо со ссылкой на сброс пароля было отправлено.'
        },
        // resetPassword
        resetPasswordPasswordIsNotProvided: {
            eng: 'Password or Confirm Password is not provided',
            rus: 'Не передан пароль или подтверждение пароля.'
        },
        resetPasswordTokenIsInvalid: {
            eng: 'Token is invalid or has expired',
            rus: 'Токен сброса пароля неверный или просроченный.'
        },
        // sendAnotherConfirmLetter
        sendAnotherConfirmLetterUserNotFound: {
            eng: 'User with such mail was not found',
            rus: 'Пользователь с такой почтой не найден.'
        },
        sendAnotherConfirmLetterUserHasConfirmedEmail: {
            eng: 'User has already confirmed mail',
            rus: 'Пользователь уже подтвердил почту.'
        },
        // changeEmail
        changeEmailNoEmail: {
            eng: 'Email is not provided',
            rus: 'Не передана почта.'
        },
        // changeEmail
        changeEmailNewEmailISEqualToCurrent: {
            eng: 'Existing email was passed. Write new one to change existing one.',
            rus: 'Передана существующая почта. Передайте другую чтобы её изменить.'
        },
        // changePassword
        changePasswordCurrentPasswordIsWrong: {
            eng: 'Your current password is wrong',
            rus: 'Передан неправильный текущий пароль.'
        },
    },
    // Контроллер авторизации
    incFilesTemplateController: {
        // Функция getAllTemplates
        // Функция createTemplate
        createTemplateNoName: {
            eng: 'Template name is not provided',
            rus: 'Не передано название шаблона'
        },
        // Функция updateTemplate
        updateTemplateNotFound: {
            eng: 'Template not found. The data has not been updated.',
            rus: 'Шаблон не найден. Данные не обновлены.'
        },
    },
    // Модель ComponentsFolders
    componentsFoldersModel: {
        userIdRequired: {
            eng: 'Specify the user id to which this order of component templates belongs.',
            rus: 'Укажите id пользователя к которому принадлежит этот порядок шаблонов компонентов.'
        },
        siteIdRequired: {
            eng: 'Specify the id of the site to which this order of component templates belongs.',
            rus: 'Укажите id сайта которому принадлежит этот порядок шаблонов компонентов.'
        },
    },
    // Контроллер порядка следования папок и файлов шаблонов компонентов
    componentsFoldersController: {
        // Функция getFolders
        getComponentsFoldersNoSiteId: {
            eng: 'The request does not pass the id of the site to which the order of the component templates belongs',
            rus: 'В запросе не передан id сайта к которому принадлежит порядок шаблонов компонентов'
        },
        // Функция updateFolders
        updateComponentsFoldersFoldersNotFound: {
            eng: 'The order of the component templates is not found. The data has not been updated.',
            rus: 'Порядок шаблонов компонентов не найден. Данные не обновлены.'
        },
    },
    // Модель Component
    componentModel: {
        uuidRequired: {
            eng: 'Specify the uuid of the component template.',
            rus: 'Укажите uuid шаблона компонента.'
        },
        userIdRequired: {
            eng: 'Specify the user id to which the component template belongs.',
            rus: 'Укажите id пользователя к которому принадлежит шаблон компонента.'
        },
        siteIdRequired: {
            eng: 'Specify the id of the site to which this component template belongs.',
            rus: 'Укажите id сайта которому принадлежит этот шаблон компонента.'
        },
        nameRequired: {
            eng: 'Specify the component template name.',
            rus: 'Укажите название шаблона компонента.'
        },
    },
    // Контроллер шаблонов компонентов
    componentController: {
        // Функция createComponent
        getComponentNoSiteId: {
            eng: 'The request does not pass the id of the site to which the order of the component templates belongs',
            rus: 'В запросе не передан id сайта к которому принадлежит порядок шаблонов компонентов'
        },
        getComponentNoName: {
            eng: 'There is no component template name in the body.',
            rus: 'В теле нет названия шаблона компонента.'
        },
        // Функция updateComponent
        updateComponentComponentNotFound: {
            eng: 'Component template not found. The data has not been updated.',
            rus: 'Шаблон компонента не найден. Данные не обновлены.'
        },
    },
    // Модель ArticlesFolders
    articlesFoldersModel: {
        userIdRequired: {
            eng: 'Specify the user id to which this order of articles belongs.',
            rus: 'Укажите id пользователя к которому принадлежит этот порядок статей.'
        },
        siteIdRequired: {
            eng: 'Specify the id of the site to which this order of articles belongs.',
            rus: 'Укажите id сайта которому принадлежит этот порядок статей.'
        },
    },
    // Контроллер порядка следования папок со статьями
    articlesFoldersController: {
        // Функция getFolders
        getFoldersNoSiteId: {
            eng: 'The request does not pass the id of the site to which the order of the component templates belongs',
            rus: 'В запросе не передан id сайта к которому принадлежит порядок папок со статьями.'
        },
        // Функция updateFolders
        updateArticlesFoldersFoldersNotFound: {
            eng: 'The order of the article folders was not found. The data has not been updated.',
            rus: 'Порядок папок статей не найден. Данные не обновлены.'
        },
    },
    // Модель Article
    articleModel: {
        uuidRequired: {
            eng: 'Specify the uuid of the article.',
            rus: 'Укажите uuid статьи.'
        },
        userIdRequired: {
            eng: 'Specify the user id to which the article belongs.',
            rus: 'Укажите id пользователя к которому принадлежит статья.'
        },
        siteIdRequired: {
            eng: 'Specify the id of the site to which this article belongs.',
            rus: 'Укажите id сайта которому принадлежит эта статья.'
        },
        nameRequired: {
            eng: 'Specify the component template name.',
            rus: 'Укажите название шаблона компонента.'
        },
    },
    // Контроллер статей
    articleController: {
        // Функция createComponent
        getArticleNoSiteId: {
            eng: 'The request does not pass the id of the site to which the order of the component templates belongs',
            rus: 'В запросе не передан id сайта к которому принадлежит порядок шаблонов компонентов'
        },
        getArticleNoName: {
            eng: 'There is no article name in the body.',
            rus: 'В теле нет названия статьи.'
        },
        // Функция updateComponent
        updateArticleArticleNotFound: {
            eng: 'Component template not found. The data has not been updated.',
            rus: 'Шаблон компонента не найден. Данные не обновлены.'
        },
    },
}



/**
 * Функция получает строку типа "Invalid input data: {{user.emailValidate}}"
 * где в фигурных скобках написан адрес настоящего текста ошибки
 * @param {String} errMessage — сообщение об ошибке
 * @param {String} lang — язык
 */
export function getMessageDependingOnTheLang(errMessage: string, lang: string) {

    // Регулярное выражение ищущее слова заключённые в двойные фигурные скобки
    const wordsInCurlyBraces = /{{(.*?)}}/g

    let wordsArr = errMessage.match(wordsInCurlyBraces) || []
    wordsArr = wordsArr.map(word => {
        return changeTemplatedError(word, lang)
    })

    return wordsArr.join(' ')
}

/**
 * Функция получает строку вида 'authController.confirmEmailUserNotFound' и язык
 * и на этих данных возвращает сообщение из объекта messages
 * @param {String} propPath — строка вида 'authController.confirmEmailUserNotFound'
 * @param {String} lang — язык сообщения (rus или eng)
 */
function changeTemplatedError(propPath: string, lang: string): string {
    // Обрезать двойные фигурные скобки слева и справа
    const clearedPropPath = propPath.slice(2, -2)

    // Получить ключи первого и второго свойства
    let [prop1, prop2] = clearedPropPath.split('.')

    // Вернуть сообщения в зависимости от переданного языка
    return messages[prop1][prop2][lang] || '< -ERROR NOT FOUND ->'
}
