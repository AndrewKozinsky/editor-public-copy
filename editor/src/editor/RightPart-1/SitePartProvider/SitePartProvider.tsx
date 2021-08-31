import React, {ReactElement, ReactNode, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import SiteSection from '../SiteSection/SiteSection'
import {AppStateType} from 'store/rootReducer'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import {NewTemplateButton, TemplatesList} from '../IncFilesTemplateList/IncFilesTemplateList'
import IncFilesTemplateForm from '../IncFilesTemplateForm/IncFilesTemplateForm'
import FoldersList from '../ComponentsOrArticles/FoldersList/FoldersList'
import ComponentFormProvider from '../ComponentsOrArticles/ComponentFormProvider'
import ArticleFormProvider from '../ComponentsOrArticles/ArticleFormProvider'
import { rightTabsMessages } from 'messages/rightTabsMessages'


/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
export default function SitePartProvider(): ReactElement {
    // Current site id and active tab number
    const { currentSiteId, rightMainTab } = useSelector((store: AppStateType) => store.sites)
    // id выделенного шаблона подключаемых файлов
    const {currentTemplateId} = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState<ReactElement>(null)

    useEffect(function () {
        // Составление массива из четырёх элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts: ReactNode = [0, 1, 2, 3].map((num) => {
            if (num === 0) {
                return (
                    <HeaderPage headerText={rightTabsMessages.sites} display={num === rightMainTab} key={num}>
                        <SiteSection />
                    </HeaderPage>
                )
            }
            else if (num === 1) {
                return (
                    <HeaderPage headerText={rightTabsMessages.incFilesTemplates} display={num === rightMainTab} key={num}>
                        <>
                            <NewTemplateButton />
                            <TemplatesList />
                        </>
                        {/*Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,*/}
                        {/*поэтому ничего не отрисовывать.*/}
                        {currentTemplateId !== null && <IncFilesTemplateForm />}
                    </HeaderPage>
                )
            }
            else if (num === 2) {
                return (
                    <HeaderPage headerText={rightTabsMessages.components} display={num === rightMainTab} key={num}>
                        <FoldersList type='components' />
                        <ComponentFormProvider />
                    </HeaderPage>
                )
            }
            else if (num === 3) {
                return (
                    <HeaderPage headerText={rightTabsMessages.articles} display={num === rightMainTab} key={num}>
                        <FoldersList type='articles' />
                        <ArticleFormProvider />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [currentSiteId, rightMainTab, currentTemplateId])

    return partComponents
}
