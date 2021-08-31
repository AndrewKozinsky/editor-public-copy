import React from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import {MiscTypes} from 'types/miscTypes'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import {incFilesTemplateSectionMessages} from 'messages/incFilesTemplateSectionMessages'
import ItemsList from 'common/ItemsList/ItemsList'
import {
    useFetchIncFilesTemplates,
    useGetNewTemplateOnClickHandler,
    useGetTemplatesItemsListProps
} from './IncFilesTemplateList-func'


/** Компонент кнопки создания нового сайта */
export function NewTemplateButton() {
    // id выделенного сайта
    const {currentTemplateId} = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler()

    // Атрибуты кнопки
    const attrs: MiscTypes.ObjStringKeyAnyVal = {
        text: incFilesTemplateSectionMessages.newTemplateBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentTemplateId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}

/** Компонент списка сайтов */
export function TemplatesList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchIncFilesTemplates()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}
