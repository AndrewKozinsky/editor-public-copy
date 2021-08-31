import { useState } from 'react'
import FHTypes from '../types'


/**
 * Хук возвращает объект со свойствами browserEvent и setBrowserEvent
 * В browserEvent находится объект где описано имя случившегося события и поле где оно произошло.
 * В setBrowserEvent находится функция изменяющая объект browserEvent
 * Это нужно чтобы при обновлении eventName запускался бы обработчик этого события у поля.
 */
export default function useBrowserEvent($form: FHTypes.$form) {
    const [browserEvent, setBrowserEvent] = useState<FHTypes.BrowserEventState>(
        { browserEvent: null, eventName: null, fieldName: '' }
    )

    return {
        browserEvent,
        setBrowserEvent
    }
}
