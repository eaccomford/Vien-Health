import { Document } from 'mongoose'
export default interface UserInterface extends Document{
    firstname: string,
    lastname: string,
    username: string,
    password: string
}