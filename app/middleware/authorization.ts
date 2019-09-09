/**
 * 统一权限认证
 */
import { Context } from 'egg';

import ERRORS from '../../config/errors.json';
import { MyError } from '../utils';

export default () => {
  return async function authorizationHandler(ctx: Context, next: any) {
    const token = ctx.request.headers.authorization;

    if (!token) {
      throw new MyError(ERRORS.AUTHORIZATION_NEEDED, 401);
    }

    /**
     * 认证协议：
     * - Basic：登录认证
     * - Bearer：权限认证
     */
    if (!/^(Bearer|Basic)\s/.test(token)) {
      throw new MyError(ERRORS.TOKEN_FAIL, 401);
    } else if (token.includes('Bearer')) { // 权限认证
      try {
        const user = await ctx.service.jwt.decode(token.substring(7));
        ctx.userInfo = user;
      } catch (e) {
        throw new MyError(ERRORS.TOKEN_FAIL, 401);
      }
    }
    await next();
  };
};
