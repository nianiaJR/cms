// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBasic from '../../../app/model/basic';
import ExportCustomer from '../../../app/model/customer';
import ExportStaff from '../../../app/model/staff';

declare module 'egg' {
  interface IModel {
    Basic: ReturnType<typeof ExportBasic>;
    Customer: ReturnType<typeof ExportCustomer>;
    Staff: ReturnType<typeof ExportStaff>;
  }
}
