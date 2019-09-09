import { Service } from 'egg';
import jwt from 'jsonwebtoken';

import config from '../../config/constants.json';

interface ISignData {
  name: string;
  account?: string;
};

interface IOption {
  expiresIn: number;
};

export default class Jwt extends Service {

  public sign(data: ISignData, options?: IOption) {
    const token = jwt.sign(data, config.jwtSecret, {
      expiresIn: 24 * 60 * 60 * 1, // 1天过期,
      ...options,
    });

    return token;
  }

  public async decode(token: string) {
    const decode = await jwt.verify(token, config.jwtSecret);

    return decode;
  }
}
