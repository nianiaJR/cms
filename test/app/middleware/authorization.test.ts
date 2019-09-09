import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

import ERRORS from '../../../config/errors.json';
import { mockStaff } from '../utils/mock';

describe('test/app/middleware/authorization.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('缺少权限验证信息', async () => {
    const { body: data, status } = await  app.httpRequest()
      .get('/api/staff')
      .send()
      .type('json')
      .send();

    assert(status === 401);
    assert(data.error);
    assert(data.error.name === ERRORS.AUTHORIZATION_NEEDED.NAME);
  });

  it('token 不正确', async () => {
    const token = ctx.service.jwt.sign({
      account: mockStaff.account,
      name: mockStaff.name,
    });
    const { body: data, status } = await app.httpRequest()
      .get('/api/staff')
      .set('Authorization', `Bearer ${token}other`)
      .type('json')
      .send();

    assert(status === 401);
    assert(data.error);
    assert(data.error.name === ERRORS.TOKEN_FAIL.NAME);
  });

  it('token 过期', async () => {
    const token = ctx.service.jwt.sign({
      account: mockStaff.account,
      name: mockStaff.name,
    }, {
      expiresIn: 0,
    });
    const { body: data, status } = await app.httpRequest()
      .get('/api/staff')
      .set('Authorization', `Bearer ${token}`)
      .type('json')
      .send();

    assert(status === 401);
    assert(data.error);
    assert(data.error.name === ERRORS.TOKEN_FAIL.NAME);
  });
});
