import { Document } from 'mongoose'
export default interface PageContentInterface extends Document{
    page: string,
    title: string,
    subtitle: string,
    body: string,
    file: string,
    url:string,
    status: string
}