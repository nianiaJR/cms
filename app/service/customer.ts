/**
 * 客户数据维护，涉及加密，存储时注意处理
 */
import { Service } from 'egg';

import ERRORS from '../../config/errors.json';
import { IPagination } from '../model/basic';
import { ICustomer, ICustomerQuery, ICustomers, ICustomerUpdate } from '../model/customer';
import { decryptObject, encrypt, encryptObject, MyError } from '../utils';

export default class Customer extends Service {
  public async create(staff: ICustomer) {
    const isExisted = await this.ctx.model.Customer.exists({
      idCard: encrypt(staff.idCard, 'idCard'),
    });

    if (!isExisted) {
      const encryptedStaff = encryptObject(staff);
      await this.ctx.model.Customer.create(encryptedStaff);
    } else {
      throw new MyError(ERRORS.CUSTOMER_EXIST);
    }
  }

  public async delete(id: string) {
    await this.ctx.model.Customer.findByIdAndDelete({
      _id: id,
    });
  }

  public async findOne(query: ICustomerQuery): Promise<ICustomer> {
    const encryptedQuery = encryptObject(query);
    const res = await this.ctx.model.Customer.findOne(encryptedQuery);

    return res && decryptObject(res.toJSON());
  }

  public async find(query: ICustomerQuery, pagination: IPagination): Promise<ICustomers> {
    const { page = 0, pageSize = 10 } = pagination;
    const encryptedQuery = encryptObject(query);
    const data = await this.ctx.model.Customer.find(encryptedQuery).skip(page * pageSize).limit(pageSize);
    const total = await this.ctx.model.Customer.count(encryptedQuery);

    return {
      data: data.map((item) => decryptObject(item.toJSON())),
      pagination: {
        page,
        pageSize,
        total,
      },
    };
  }

  public async updateOne(query: ICustomerQuery, params: ICustomerUpdate) {
    const encryptedQuery = encryptObject(query);
    const encryptedParams = encryptObject(params);
    await this.ctx.model.Customer.updateOne(encryptedQuery, encryptedParams);
  }
}
