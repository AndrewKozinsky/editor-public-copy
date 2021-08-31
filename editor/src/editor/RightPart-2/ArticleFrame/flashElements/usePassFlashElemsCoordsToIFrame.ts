import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import StoreArticleTypes from 'store/article/articleTypes'

// Type with coordinates of a flashed element
export type CoordsObjType = {
    type: StoreArticleTypes.HoveredElementType
    dataCompId: null | number
    dataElemId: null | number
}

// Initial data with coordinates of a flashed element
export const coordsInitialObj: CoordsObjType = {
    type: null,
    dataCompId: null,
    dataElemId: null
}

/** The hook gets coordinated of a flashed element from the Store and write its to <body> as a attribute */
export function usePassFlashElemsCoordsToIFrame() {
    const { $links, history, historyCurrentIdx } = useSelector((store: AppStateType) => store.article)

    // Objects witch data is stored. I will update them if data from the Store is different
    const [hoverRectCoords, setHoverRectCoords] = useState(coordsInitialObj)
    const [selectRectCoords, setSelectRectCoords] = useState(coordsInitialObj)

    useEffect(function () {
        if (!$links.$body || !history.length) return

        // Get data of the hovered and selected element from an actual article
        const { hoveredElem, selectedElem } = history[historyCurrentIdx]

        // Update hoverRectCoords if a data from the Store is different
        if (hoveredElem.dataCompId !== hoverRectCoords.dataCompId || hoveredElem.dataElemId !== hoverRectCoords.dataElemId) {
            setHoverRectCoords(hoveredElem)
        }

        // Update selectRectCoords if a data from the Store is different
        if (selectedElem.dataCompId !== selectRectCoords.dataCompId || selectedElem.dataElemId !== selectRectCoords.dataElemId) {
            setSelectRectCoords(selectedElem)
        }
    }, [$links, history, historyCurrentIdx])


    // The useEffect is watches when hoverRectCoords changes to write new jovered element coordinates to <body> as attribute
    useEffect(function () {
        if (!$links.$body) return

        // Change object into JSON
        const hoverCoords = JSON.stringify(hoverRectCoords)
        // Save JSON in attribute
        $links.$body.setAttribute('hoverrectcoords', hoverCoords)
    }, [hoverRectCoords])

    // The save with the selected elements
    useEffect(function () {
        if (!$links.$body) return

        const selectCoords = JSON.stringify(selectRectCoords)
        $links.$body.setAttribute('selectrectcoords', selectCoords)
    }, [selectRectCoords])
}
