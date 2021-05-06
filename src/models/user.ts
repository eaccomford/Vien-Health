import logging from 'config/logging';
import mongoose, {Schema} from 'mongoose'
import UserInterface from '../interfaces/userInterface'

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
},
{
    timestamps: true
})

// UserSchema.post<UserInterface>('save', function () {
//     logging.info('Mongo', 'Checkout the book we just saved: ', this);
// });

export default mongoose.model<UserInterface>('User', UserSchema)