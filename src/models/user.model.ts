import mongoose, { Schema, Document } from 'mongoose';
import moment from 'moment';

export interface UserInterface extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: moment.utc().toDate() },
  updated_at: { type: Date, default: moment.utc().toDate() },
});

UserSchema.pre<UserInterface>('save', function (next) {
  this.updated_at = moment.utc().toDate();
  next();
});

export default mongoose.model<UserInterface>('User', UserSchema);
