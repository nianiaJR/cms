import { Service } from 'egg';

import ERRORS from '../../config/errors.json';
import { IStaff, IStaffQuery, IStaffUpdate } from '../model/staff';
import { MyError } from '../utils';

export default class Staff extends Service {
  public async create(staff: IStaff) {
    const isExisted = await this.ctx.model.Staff.exists({
      account: staff.account,
    });

    if (!isExisted) {
      await this.ctx.model.Staff.create(staff);
    } else {
      throw new MyError(ERRORS.ACCOUNT_EXIST);
    }
  }

  public async delete(account: string) {
    await this.ctx.model.Staff.deleteOne({
      account,
    });
  }

  public async findOne(query: IStaffQuery): Promise<IStaff> {
    const res = await this.ctx.model.Staff.findOne(query);

    return res;
  }

  public async updateOne(query: IStaffQuery, params: IStaffUpdate) {
    await this.ctx.model.Staff.updateOne(query, params);
  }
}
