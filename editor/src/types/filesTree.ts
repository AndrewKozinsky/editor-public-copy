
// Core Folders tree structure types
namespace FilesTreeType {
    // Folders and files array
    export type Items = Item[]

    export type Item = {
        uuid: UuId // Folder or file uuid
        type: ItemType // Item type: folder or file
        name: string // Item name
        open?: boolean // Is folder open
        content?: Items // Folder's content
    }

    export type UuId = string
    export type UuIdArr = UuId[]

    // Item type: folder or file
    export type ItemType = 'file' | 'folder'
}

export default FilesTreeType
