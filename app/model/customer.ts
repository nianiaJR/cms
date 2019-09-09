import { Application } from 'egg';

import { encrypt } from '../utils';
import { IPagination } from './basic';

export enum SexEnum {
  Female = 'female',
  Male = 'male',
  unknown = 'unknown',
}

export interface ICustomer {
  name: string;
  phone: string;
  idCard: string;
  sex?: SexEnum;
  _id?: string;
}

export interface ICustomers {
  data: ICustomer[];
  pagination: IPagination;
}

export interface ICustomerQuery {
  _id?: string;
  phone?: string;
  idCard?: string;
}

export interface ICustomerUpdate {
  phone?: string;
  sex?: SexEnum;
}

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const customerSchema = new Schema({
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
      required: true,
    },
    sex: {
      type: String,
      default: encrypt(SexEnum.unknown, 'sex'),
    },
  });

  return mongoose.model('Customer', customerSchema);
};
