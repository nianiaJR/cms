import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

import ERRORS from '../../../config/errors.json';
import { mockStaff } from '../utils/mock';

describe('test/app/service/staff.test.ts', () => {
  let ctx: Context;
  before(async () => {
    ctx = app.mockContext();
  });

  it('员工的增查改删', async () => {
    let staff;
    // 增
    await ctx.service.staff.create(mockStaff);

    // 查
    staff = await ctx.service.staff.findOne({
      account: mockStaff.account,
    });
    assert(staff.name === mockStaff.name);

    // 改
    const modifyName = mockStaff.name + '-other';
    await ctx.service.staff.updateOne({
      name: mockStaff.name,
    }, {
      name: modifyName,
    });
    staff = await ctx.service.staff.findOne({
      account: mockStaff.account,
    });
    assert(staff.name === modifyName);

    // 删除
    await ctx.service.staff.delete(mockStaff.account);
    const b = await ctx.service.staff.findOne({
      account: mockStaff.account,
    });

    assert(!b);
  });

  it('创建账号已存在员工', async () => {
    // 先插入一条员工记录
    await ctx.service.staff.create(mockStaff);
    try {
      // 再次插入相同员工信息
      await ctx.service.staff.create(mockStaff);
    } catch (e) {
      console.log(e);
      assert(e.name === ERRORS.ACCOUNT_EXIST.NAME);
    }

    // 删除
    await ctx.service.staff.delete(mockStaff.account);
  });
});
