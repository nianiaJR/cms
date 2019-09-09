/**
 * 统一错误处理
 */
import { Context } from 'egg';

export default () => {
  return async function errorHandler(ctx: Context, next: any) {
    try {
      await next();
    } catch (e) {
      const { message, name, status= 500 } = e;
      ctx.response.status = status;
      ctx.response.body = {
        error: {
          message,
          name,
        },
      };
    }
  };
};
