import React from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

// Компоненты
import Loader from 'common/misc/Loader/Loader'
import NotFound from '../NotFound/NotFound'

// Страницы
import EditorMain from 'editor/wrappers/EditorMain/EditorMain'
import EntrancePages from 'entrance/EntrancePages/EntrancePages'

// JS и CSS
import {
    useGetAndSetEditorSettings,
    useSetTokenStatus
} from './app-fn/init'
import {
    useGetAppClasses,
    useRedirectPage
} from './app-fn/App-func'
import setShortcutsHandler from './shortcuts/shortcutsHandler'
import './css/reset.css'
import './css/variables.scss'
import './css/default.scss'
import './css/app.scss'

/** Компонент всего приложения */
export default function App() {
    // TODO Figure out why the types from Store are not detected.
    // TODO Don't forgot to use eslint, prettier and stylelint.
    // TODO MAYBE BETTER USE ORDINARY JSON INSTEAD JSON6 BECAUSE IT WORKS BADLY WITH ARRAYS
    // TODO If I have two Grid components and I put an image to the second grid's cell it appears in the first.
    // TODO Use a more specific name instead of id in the article data.
    // TODO User must pass array of objects with data about including files instead a single string.
    // TODO You didn't consider when user types text and element expands. Then flashed rectangle doesn't match element size. Yet it pages was is scrolled flashed rectangle set on a wrong position. Yet flashed rectangle set on a wrong position if pages is scrolled.
    // TODO Можно все запросы связанные с компонентами, которые зависимы от сайта (получение компонентов сайта, удаление компонента сайта и так далее) перенести в контроллер сайта. Так получится логичнее.
    // TODO Надо сделать отдельные файлы с типами присылаемых с сервера данных: сайт, компонент, шаблон файлов, статью и использовать их для типизации запросов.
    // TODO You can plug in Prettier and TSLint
    // TODO Уточни в каком формате приходит список сайтов в editor/src/requests/sitesRequest.ts
    // TODO Функцию getFirstInvalidField можно вынести в отдельный файл потому что она постоянно повторяется. Да и другие функции так же можно сократить таким же образом. Может даже функцию в файле formResources вынести в отдельный файл и везде подключать. Хотя в этом случае нужно пересмотреть все файлы где она используется.
    // TODO If a request for model data depends on site then you have to include site/:siteId in address.
    // TODO Если в сайте создать шаблоны компонентов, затем сайт удалить и перейти на вкладку шаблонов компонентов, то там будет форма редактирования существующего компонента потому что в localStorage остались данные по этому выделенному компоненту. Конечно при удалении сайта можно удалять из localStorage свойства  editorComponentType, editorComponentId и editorIncFilesId, но возможно они принадлежат компонентам сайта. Поэтому это не лучшее решение. Подумай как сделать чтобы при удалении сайта из localStorage удалялись данные относящиеся к нему.
    // TODO Сделай на вкладке сайта выпадающей список с шаблонами и выбранным шаблоном по умолчанию.
    // TODO Добавь useCallback всем хукам где это требуется.
    // TODO Сделай документацию как на https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/story/controls-radiobox-desktop--playground
    // TODO Не забывай что текстовые поля должны соответствовать предполагаемому количеству вводимых символов. Если будет только три символа, то поле не должно быть на всю ширину.
    // TODO Надо бы в базе данных в коллекций сделать даты создания. Это потребуется при сортировке материалов в будущем.
    // TODO Все useDispatch() можно заменить на store.dispatch() ради краткости
    // TODO После отправки формы на странице подтверждения почты программа перенаправит на страницу редактора. Но на полсекунды появится форма входа, которая затем растворится. Из-за этого возникает рваная анимация. Еще в Консоле есть ошибка Реакта. Это нужно исправить.
    // TODO Посмотри можно ли useHandleConfirmChangingEmailModal() заменить на универсальную useGetShowModal()
    // TODO Better disable form when data loads: when they submit form or download data because tab switch
    // https://stackoverflow.com/questions/50651856/iframe-problems-script-src-not-loaded-at-all


    // TODO ПОСМОТРИ В БУДУЩЕМ-------------------------
    // TODO Попробуй сделать чтобы во всех формах где требуется написать пароль браузер его бы подставлял. Можно посмотреть как это сделано на других сайтах.
    // TODO Думаю в FormHandler-е нужно сделать свойство где будет храниться название поля у которого произошло событие. Продумай это.
    // TODO Не смог сделать вложенный адрес вида editor/first/second. Поэтому страницы ввода нового пароля и подтверждения почты сделал по-другому.
    // TODO Мне кажется будет прикольно сделать анимированное появление box-shadow при фокусе на поле ввода. Но наскоком у меня это сделать не получилось. Очевидно нужно оборачивать все поля в обёртку и задавать уже ей необходимые стили и плавные переходы.
    // TODO Из http://videolab.online/ можно стащить соглашения об использовании сервиса
    // TODO Переодически добавляй useCallback во все места где это требуется.
    // TODO В полях ввода есть повторяющиеся функции и хуки. Можно такие функции занести в отдельный файл.
    // TODO Watch how well the script set key value while build article. May be it may to optimize.
    // Shift + F6 // Переименовывание всех переменных разом
    // Cmd - / Cmd + // Сворачивание / разворачивание стека
    // Alt + Cmd + T // Оборачивание выделенных тегов в HTML  или в конструкцию if ... else, while, for...в JS
    // Shift + Cmd + Fn + Del // Удаление оберти в HTML или  if ... else, while, for... в JS

    // Поставить настройки редактора в Хранилище
    useGetAndSetEditorSettings()

    // Проинициализировать приложение и возвратить статус сделано ли это
    const isTokenSet = useSetTokenStatus()

    // Установка обработчика горячих клавиш при запуске приложения
    setShortcutsHandler()

    // Переадресовать пользователя на другую страницу в зависимости от того
    // зарегистрирован он или нет
    useRedirectPage()

    // Классы обёртки компонента
    const appClasses = useGetAppClasses()

    // Показать загрузчик если приложение еще не инициализировалось
    if (!isTokenSet) {
        return <div className={appClasses}><Loader /></div>
    }

    return (
        <div className={appClasses}>
            <Switch>
                <Route path={['/', '/enter', '/reg', '/reset-password', '/change-reset-password', '/confirm-email']} exact>
                    <EditorMain />
                    <EntrancePages />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}
