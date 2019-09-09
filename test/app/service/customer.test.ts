import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

import { SexEnum } from '../../../app/model/customer';
import ERRORS from '../../../config/errors.json';
import { mockCustomer } from '../utils/mock';

describe('test/app/service/customer.test.ts', () => {
  let ctx: Context;
  before(async () => {
    ctx = app.mockContext();
    // 清空相关测试数据
    await ctx.model.Customer.deleteMany({});
  });

  it('客户信息的增查改删', async () => {
    let customer;
    // 增
    await ctx.service.customer.create(mockCustomer);

    // 查
    customer = await ctx.service.customer.findOne({
      idCard: mockCustomer.idCard,
    });
    assert(customer.name === mockCustomer.name);

    // 改
    await ctx.service.customer.updateOne({
      idCard: mockCustomer.idCard,
    }, {
      sex: SexEnum.Male,
    });
    customer = await ctx.service.customer.findOne({
      idCard: mockCustomer.idCard,
    });
    assert(customer.sex === SexEnum.Male);

    // 删除
    await ctx.service.customer.delete(customer._id);
    const b = await ctx.service.customer.findOne({
      idCard: mockCustomer.idCard,
    });

    assert(!b);
  });

  it('创建已存在的客户', async () => {
    // 先插入一条员工记录
    await ctx.service.customer.create(mockCustomer);
    try {
      // 再次插入相同员工信息
      await ctx.service.customer.create(mockCustomer);
    } catch (e) {
      console.log(e);
      assert(e.name === ERRORS.CUSTOMER_EXIST.NAME);
    }

    const customer = await ctx.service.customer.findOne({
      idCard: mockCustomer.idCard,
    });
    // 删除
    if (customer._id) {
      await ctx.service.customer.delete(customer._id);
    }
  });

  it('获取客户列表', async () => {
    // 先插入一条员工记录
    await ctx.service.customer.create(mockCustomer);
    const res = await ctx.service.customer.find({
      idCard: mockCustomer.idCard,
    }, {
      page: 0,
    });

    assert(res.data[0].idCard === mockCustomer.idCard);
    assert(res.pagination.total === 1);
    assert(res.pagination.page === 0);
    assert(res.pagination.pageSize === 10);

    if (res.data[0]._id) {
      await ctx.service.customer.delete(res.data[0]._id);
    }
  });
});
