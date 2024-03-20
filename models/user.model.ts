import mongoose, { Schema, Document } from 'mongoose';
import moment from 'moment';

export interface UserInterface extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: String, required: true, default: moment().format('YYYY-MM-DD HH::mm::ss') },
});

export default mongoose.model<UserInterface>('User', UserSchema);
