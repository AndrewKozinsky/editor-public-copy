import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

// CALL IT SITE_INC
export interface IIncFilesTemplate extends Document {
    name: string,
    userId: string,
    siteId: string,
    codeInHead?: {
        code?: string
    },
    codeBeforeEndBody?: {
        code?: string
    },
    createdAt: Date,
}

// Схема о подключаемых к сайту файлах CSS, JS и так далее
const IncFilesTemplateSchema: Schema = new Schema({
    // Название шаблона
    name: {
        type: String,
        required: [true, '{{incFilesTemplate.nameRequired}}'],
        maxLength: [250, '{{incFilesTemplate.nameMaxLength}}'],
    },
    // id пользователя, кому принадлежит сайт с этим шаблоном
    userId: {
        type: String,
        required: [true, '{{incFilesTemplate.userIdRequired}}']
    },
    // id сайта шаблона
    siteId: {
        type: String,
        required: [true, '{{incFilesTemplate.siteIdRequired}}']
    },
    // Объект с кодом, который нужно подключать в <head>
    codeInHead: {
        // Код, который нужно поместить в <head>
        code: {
            type: String,
            maxLength: [65000, '{{incFilesTemplate.codeInHeadCodeMaxLength}}'],
        },

    },
    // Объект с кодом, который нужно подключать в <head>
    codeBeforeEndBody: {
        // Код, который нужно поместить перед </body>
        code: {
            type: String,
            maxLength: [65000, '{{incFilesTemplate.codeBeforeEndBodyCodeMaxLength}}'],
        },
    },
    createdAt: {
        type: Date,
        required: [ true, '{{user.????????}}' ]
    },
})


const IncFilesTemplateModel = mongoose.model<IIncFilesTemplate>('IncFilesTemplate', IncFilesTemplateSchema)
export default IncFilesTemplateModel