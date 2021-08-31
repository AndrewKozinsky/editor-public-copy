import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import { makeCN } from 'utils/StringUtils'


/**
 * Функция возращает классы главной обёртки редактора и булево значение нужно ли отрисовывать редактор
 * @param CN
 */
export function useGetPageClasses(CN: string) {

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useSelector((store: AppStateType) => store.settings)

    const [classes, setClasses] = useState<string[]>( getClasses(CN) )
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        // Классы редактора: нормальный вид и отдалённый от зрителя
        const normalClasses = getClasses(CN)
        const scaleDownClasses = getClasses(CN, 'scaleDown')
        const scaleDownTransparencyClasses = getClasses(CN, 'scaleDownTransparent')

        // В зависимости от вида показывать или нормальный вид редактора или отдалённый
        // или он вообще не будет отрисовываться.
        // Если нужно показать редактор
        if (entryAndEditorViewState === 'editor') {
            setIsVisible(true)
            setClasses( normalClasses )
        }
        // Если нужно показать плавный переход от форм входа к редактору
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses( scaleDownTransparencyClasses )
            setTimeout(function () {
                setClasses( normalClasses )
            }, 10)
        }
        // Если нужно показать плавный переход от редактора к формам входа
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses( normalClasses )
            setTimeout(function () {
                setClasses( scaleDownTransparencyClasses )
            }, 10)
        }
        // Если нужно показать редактор
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(false)
            setClasses( scaleDownTransparencyClasses )
        }
        // В противном случае ничего не отрисовывать
        else {
            setIsVisible(false)
            setClasses( scaleDownTransparencyClasses )
        }
    }, [entryAndEditorViewState])

    return {
        classes: makeCN(classes),
        isVisible
    }
}

/**
 * Функция возращает классы главной обёртки редактора в зависимости от различных значений:
 * @param {String} CN — главный класс обёртки редактора
 * @param {String} scaleDownType — тип дополнительного класса:
 * scaleDown — редактор отдалён от зрителя
 * scaleDownTransparent — редактор отдалён от зрителя и прозрачен
 */
function getClasses( CN: string, scaleDownType?: 'scaleDown' | 'scaleDownTransparent' ) {
    const classes = [CN]

    if (scaleDownType === 'scaleDown') classes.push(`${CN}--scale-down`)
    if (scaleDownType === 'scaleDownTransparent') classes.push(`${CN}--scale-down-transparent`)

    return classes
}
