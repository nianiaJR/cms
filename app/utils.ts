import crypto from 'crypto';

import config from '../config/constants.json';

export class MyError extends Error {
  status: any;

  constructor(info: any, status ?: number) {
    super();
    const { MESSAGE: m, NAME: n } = info;

    this.name = n;
    this.message = m;
    this.status = status || 500;
  }
}

// 加密
export const encrypt = (data: any, key: string) => {
  const cipher = crypto.createCipher('aes192', `${config.infoSecret}${key}`);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

// 解密
export const decrypt = (encrypted: string, key: string) => {
  const decipher = crypto.createDecipher('aes192', `${config.infoSecret}${key}`);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const filterEncryptFields = ['_id', '__v'];

// 数据对象加密
export const encryptObject = (data: object) => {
  return Object.keys(data)
    .reduce((res: any, key: string) => {
      if (!filterEncryptFields.includes(key)) {
        res[key] = encrypt(data[key], key);
      } else {
        res[key] = data[key];
      }

      return res;
    }, {});
};

// 数据对象解密
export const decryptObject = (data: object) => {
  return Object.keys(data)
    .reduce((res: any, key: string) => {
      if (!filterEncryptFields.includes(key)) {
        res[key] = decrypt(data[key], key);
      } else {
        res[key] = data[key];
      }

      return res;
    }, {});
};
