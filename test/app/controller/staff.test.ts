import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { Base64 } from 'js-base64';

import { encrypt } from '../../../app/utils';
import ERRORS from '../../../config/errors.json';
import { mockStaff } from '../utils/mock';

describe('test/app/controller/staff.test.ts', () => {
  let ctx: Context;
  before(async () => {
    ctx = app.mockContext();
    // 插入一个员工信息
    await ctx.service.staff.create({
      ...mockStaff,
      password: encrypt(mockStaff.password, 'password'),
    });
  });

  describe('登录接口 - login', () => {
    it('账号不正确', async () => {
      const { body: data, status } = await app.httpRequest()
        .post('/api/login')
        .set('Authorization', `Basic ${Base64.encode(`${mockStaff.account + '1'}:${mockStaff.password}`)}`)
        .type('json')
        .send();

      assert(status === 400);
      assert(data.error);
      assert(data.error.name === ERRORS.ACCOUNT_PASSWORD.NAME);
    });

    it('密码不正确', async () => {
      const { body: data, status } = await app.httpRequest()
        .post('/api/login')
        .set('Authorization', `Basic ${Base64.encode(`${mockStaff.account}:${mockStaff.password + '1'}`)}`)
        .type('json')
        .send();

      assert(status === 400);
      assert(data.error);
      assert(data.error.name === ERRORS.ACCOUNT_PASSWORD.NAME);
    });

    it('登录成功', async () => {
      const { body: data, status } = await app.httpRequest()
        .post('/api/login')
        .set('Authorization', `Basic ${Base64.encode(`${mockStaff.account}:${mockStaff.password}`)}`)
        .type('json')
        .send();

      assert(status === 200);
      assert(data.token);
    });
  });

  describe('员工信息 - index', () => {
    it('获取员工信息成功', async () => {
      const token = ctx.service.jwt.sign({
        account: mockStaff.account,
        name: mockStaff.name,
      });
      const { body: data, status } = await app.httpRequest()
        .get('/api/staff')
        .set('Authorization', `Bearer ${token}`)
        .type('json')
        .send();

      assert(status === 200);
      assert(data.account === mockStaff.account);
      assert(data.name === mockStaff.name);
    });
  });

  after(async () => {
    await ctx.service.staff.delete(mockStaff.account);
  });
}); ;
