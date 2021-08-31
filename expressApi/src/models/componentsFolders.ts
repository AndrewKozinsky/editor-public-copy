import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IComponentsFolders extends Document {
    userId: string,
    siteId: string,
    content?: string,
}

// Схема порядка следования шаблонов компонентов
const ComponentsFoldersSchema: Schema = new Schema({
    // id пользователя которому принадлежит документ
    // Требуется для удаления всех документов при удалении пользователя
    userId: {
        type: String,
        required: [true, '{{componentsFoldersModel.userIdRequired}}']
    },
    // id сайта к которому относится шаблон компонента
    siteId: {
        type: String,
        required: [true, '{{componentsFoldersModel.siteIdRequired}}']
    },
    // JSON со структурой папок и файлов
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: [ true, '{{user.????????}}' ]
    },
})


const ComponentsFoldersModel = mongoose.model<IComponentsFolders>('ComponentsFolders', ComponentsFoldersSchema)
export default ComponentsFoldersModel