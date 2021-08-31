import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface IArticle extends Document {
    uuid: string,
    userId: string,
    siteId: string,
    name: string,
    code?: string,
    incFilesTemplateId?: string,
createdAt: Date,
}

// Схема шаблона компонента
const ArticleSchema: Schema = new Schema({
    // собственный id статьи сгенерированный на клиенте.
    // Требуется для упрощения создания статей из дерева папок и шаблонов.
    uuid: {
        type: String,
        required: [true, '{{articleModel.uuidRequired}}']
    },
    // id пользователя которому принадлежит статья
    // Требуется для удаления всех документов при удалении пользователя
    userId: {
        type: String,
        required: [true, '{{articleModel.userIdRequired}}']
    },
    // id сайта к которому относится статья
    siteId: {
        type: String,
        required: [true, '{{articleModel.siteIdRequired}}']
    },
    // Название статьи
    name: {
        type: String,
        required: [true, '{{articleModel.nameRequired}}']
    },
    // код статьи
    code: {
        type: String
    },
    // id шаблона подключаемых файлов
    incFilesTemplateId: {
        type: String
    },
    createdAt: {
        type: Date,
        required: [ true, '{{user.????????}}' ]
    },
})


const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema)
export default ArticleModel