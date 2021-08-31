import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IArticlesFolders extends Document {
    userId: string,
    siteId: string,
    content?: string,
}

// Схема порядка следования шаблонов компонентов
const ArticlesFoldersSchema: Schema = new Schema({
    // id пользователя которому принадлежит документ
    // Требуется для удаления всех документов при удалении пользователя
    userId: {
        type: String,
        required: [true, '{{articlesFoldersModel.userIdRequired}}']
    },
    // id сайта к которому относится шаблон компонента
    siteId: {
        type: String,
        required: [true, '{{articlesFoldersModel.siteIdRequired}}']
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


const ArticlesFoldersModel = mongoose.model<IArticlesFolders>('ArticlesFolders', ArticlesFoldersSchema)
export default ArticlesFoldersModel