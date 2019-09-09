import { Controller } from 'egg';
import { Base64 } from 'js-base64';

import ERRORS from '../../config/errors.json';
import { encrypt, MyError } from '../utils';

export default class StaffController extends Controller {
  async login() {
    const { ctx } = this;
    const authorization = ctx.request.headers.authorization;

    const [account, password] = Base64.decode(authorization.substring(6)).split(':');
    const staff = await ctx.service.staff.findOne({ account });

    if (!staff || staff.password !== encrypt(password, 'password')) {
        throw new MyError(ERRORS.ACCOUNT_PASSWORD, 400);
    }

    const token = ctx.service.jwt.sign({
      account: staff.account,
      name: staff.name,
    });

    ctx.response.status = 200;
    ctx.response.body = {
      token,
    };
  }

  async index() {
    const { ctx } = this;

    ctx.response.status = 200;
    ctx.response.body = {
      ...ctx.userInfo,
    };
  }
}
