import mongoose, {Schema} from 'mongoose'
import PageContentInterface from '../interfaces/pageContentInterface'

const pageContentSchema: Schema = new Schema({
    page: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String},
    body: { type: String },
    file: { type: String },
    url: { type: String },
    status: { type: Number, default: 0 },
},
{
    timestamps: true
})

export default mongoose.model<PageContentInterface>('PageContent', pageContentSchema)
