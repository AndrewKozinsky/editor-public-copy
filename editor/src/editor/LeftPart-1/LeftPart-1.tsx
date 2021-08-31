import React from 'react'
import { sitesPanelMessages } from 'messages/sitesPanelMessages'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import NameSection from '../wrappers/NameSection/NameSection'
import Button from 'common/formElements/Button/Button'
import {
    useFetchSites,
    useGetNewSiteOnClickHandler,
    useGetSitesItemsListProps
} from './LeftPart1-func'
import ItemsList from 'common/ItemsList/ItemsList'
import Wrapper from 'common/Wrapper/Wrapper'
import { MiscTypes } from 'types/miscTypes'
import './LeftPart-1.scss'


type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

/** Левая часть первой главной вкладки */
export default function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Атрибуты обёртки панели
    const CN = 'left-part-1'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {/*<NameSection header={sitesPanelMessages.header}>*/}
                {/*<NewSiteButton />*/}
                {/*<SitesButtons />*/}
            {/*</NameSection>*/}
        </div>
    )
}

/** Компонент кнопки создания нового сайта */
function NewSiteButton() {

    // id выделенного сайта
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewSiteOnClickHandler()

    // Атрибуты кнопки
    const attrs: MiscTypes.ObjStringKeyAnyVal = {
        text: sitesPanelMessages.newSiteBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentSiteId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}

/** Компонент списка сайтов */
function SitesButtons() {
    // Получить с сервера список сайтов и поставить в Хранилище
    useFetchSites()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetSitesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}
