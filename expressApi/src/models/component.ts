import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface IComponent extends Document {
    uuid: string,
    userId: string,
    siteId: string,
    name: string,
    code?: string,
    createdAt: Date,
}

// Схема шаблона компонента
const ComponentSchema: Schema = new Schema({
    // собственный id шаблона сгенерированный на клиенте.
    // Требуется для упрощения создания компонентов из дерева папок и шаблонов.
    uuid: {
        type: String,
        required: [true, '{{componentModel.uuidRequired}}']
    },
    // id пользователя которому принадлежит шаблон компонента
    // Требуется для удаления всех документов при удалении пользователя
    userId: {
        type: String,
        required: [true, '{{componentModel.userIdRequired}}']
    },
    // id сайта к которому относится шаблон компонента
    siteId: {
        type: String,
        required: [true, '{{componentModel.siteIdRequired}}']
    },
    // Название шаблона компонента
    name: {
        type: String,
        required: [true, '{{componentModel.nameRequired}}']
    },
    // код шаблона компонента
    code: {
        type: String
    },
    createdAt: {
        type: Date,
        required: [ true, '{{user.????????}}' ]
    },
})


const ComponentModel = mongoose.model<IComponent>('Component', ComponentSchema)
export default ComponentModel