import mongoose, {Schema} from 'mongoose'
import UserInterface from '../interfaces/userInterface'

const UserSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true },
    status: { type: Number, default: 0 },
},
{
    timestamps: true
})

export default mongoose.model<UserInterface>('User', UserSchema)