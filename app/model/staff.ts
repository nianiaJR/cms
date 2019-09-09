import { Application } from 'egg';

export interface IStaff {
  account: string;
  password: string;
  name: string;
  phone: string;
  idCard?: string;
}

export interface IStaffQuery {
  account?: string;
  name?: string;
  phone?: string;
}

export interface IStaffUpdate {
  password?: string;
  name?: string;
  phone?: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const staffSchema = new Schema({
    account: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: false,
    },
  });

  return  mongoose.model('Staff', staffSchema);
};
