// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthorization from '../../../app/middleware/authorization';
import ExportError from '../../../app/middleware/error';

declare module 'egg' {
  interface IMiddleware {
    authorization: typeof ExportAuthorization;
    error: typeof ExportError;
  }
}
