import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import {useEffect} from 'react'


// Hook cleans the iframe if an article was cleaned
export function useCleanIFrame() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)

    useEffect(function () {
        if (!$links.$body || history.length) return

        $links.$head.innerHTML = ''
        $links.$body.innerHTML = ''

        $links.$body.removeAttribute('hoverrectcoords')
    }, [$links.$body, history])
}
