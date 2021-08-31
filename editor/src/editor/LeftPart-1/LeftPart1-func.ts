import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import {ItemsListPropType} from 'common/ItemsList/ItemsList'
import {AppStateType} from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'


// Хук скачивает с сервера массив сайтов и ставит в Хранилище
export function useFetchSites() {
    const dispatch = useDispatch()

    // При загрузке компонента...
    useEffect(function () {
        // Сделать запрос на получение сайтов и установить в Хранилище
        dispatch( actions.sites.requestSites() )
    }, [])
}


/** Хук возвращает атрибуты для компонента ItemsList для формирования списка сайтов */
export function useGetSitesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного сайта
    const {currentSiteId, sites} = useSelector((store: AppStateType) => store.sites)

    // Сформировать и вернуть объект с атрибутами списка пунктов
    return {
        // Список пунктов
        items: sites.map((site: StoreSitesTypes.SiteType) => {
            return {
                id: site.id,
                name: site.name,
                onClick: () => {
                    dispatch( actions.sites.setCurrentSiteId(site.id) )
                    // Clear opened article item type (folder or file)
                    dispatch( actions.sites.setCurrentCompItemType(null) )
                    // Clear opened article item id (folder or file)
                    dispatch( actions.sites.setCurrentCompItemId(null) )

                    // Clear opened article item type (folder or file)
                    dispatch( actions.sites.setCurrentArtItemType(null) )
                    // Clear opened article item id (folder or file)
                    dispatch( actions.sites.setCurrentArtItemId(null) )
                }
            }
        }),
        activeItemId: currentSiteId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового сайта */
export function useGetNewSiteOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id выбранного сайта
    // чтобы программа понимала, что нужно показать форму создания нового сайта
    return function () {
        // Поставить id сайта. Пустая строка обозначает id нового сайта.
        dispatch( actions.sites.setCurrentSiteId('') )
        // Поставить на первую правую вкладку
        dispatch( actions.sites.setRightMainTab(0) )
    }
}
