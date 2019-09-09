// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/service/customer';
import ExportJwt from '../../../app/service/jwt';
import ExportStaff from '../../../app/service/staff';
import ExportTest from '../../../app/service/test';

declare module 'egg' {
  interface IService {
    customer: ExportCustomer;
    jwt: ExportJwt;
    staff: ExportStaff;
    test: ExportTest;
  }
}
