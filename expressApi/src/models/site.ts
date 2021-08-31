import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface ISite extends Document {
    name: string,
    userId: string,
    defaultIncFilesTemplateId?: null | string,
    createdAt: Date,
}

// Схема с данными сайта
const SiteSchema: Schema = new Schema({
    // Название сайта
    name: {
        type: String,
        required: [true, '{{site.nameRequired}}'],
    },
    // id пользователя
    userId: {
        type: String,
        required: [true, '{{site.userIdRequired}}']
    },
    // id пользователя
    defaultIncFilesTemplateId: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: [ true, '{{user.????????}}' ]
    },
})


const SiteModel = mongoose.model<ISite>('Site', SiteSchema)
export default SiteModel