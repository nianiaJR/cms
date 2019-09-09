// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/controller/customer';
import ExportHome from '../../../app/controller/home';
import ExportStaff from '../../../app/controller/staff';

declare module 'egg' {
  interface IController {
    customer: ExportCustomer;
    home: ExportHome;
    staff: ExportStaff;
  }
}
