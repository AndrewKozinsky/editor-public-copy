import { MenuItems } from 'common/misc/Menu/Menu'


/** Функция возвращает массив данных для генерации меню выше формы */
export function getMenuItems(regMenuMsg: any): MenuItems {
    return [
        { to: '/reg', label: regMenuMsg.reg },
        { to: '/enter', label: regMenuMsg.enter },
        { to: '/reset-password', label: regMenuMsg.reset }
    ]
}
