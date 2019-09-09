import { Controller } from 'egg';

export default class StaffController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.response.status = 200;
    ctx.response.body = {
      ...ctx.userInfo,
    };
  }
}
