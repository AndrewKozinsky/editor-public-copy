import { useMemo } from 'react'
import DragFilesTreeType from '../types'
import { getMaxDeep } from '../StoreManage/manageState'

/**
 * Хук возвращает минимальную ширину обёртки FilesTree в зависимости от количества вложенных элементов
 * @param {Array} items — массив данных по папкам и файлам.
 */
export function useGetFilesTreeMinWidth(items: DragFilesTreeType.Items) {
    return useMemo(function () {
        const maxDeep = getMaxDeep(items)
        return maxDeep * 20 + 180
    }, [items])
}
