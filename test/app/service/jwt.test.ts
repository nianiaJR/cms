import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/jwt.test.ts', () => {
  let ctx: Context;
  before(async () => {
    ctx = app.mockContext();
  });

  it('encode and decode success', async () => {
    const data = {
      name: 'jiarui',
    };
    const token = ctx.service.jwt.sign(data);
    const decode = await ctx.service.jwt.decode(token);

    assert(decode.name = data.name);
  });

  it('token wrong', async () => {
    const data = {
      name: 'jiarui',
    };
    const token = ctx.service.jwt.sign(data);
    try {
      await ctx.service.jwt.decode(token + 'error');
    } catch (e) {
      assert(e.name === 'JsonWebTokenError');
    }

  });

  it('token expire', async () => {
    const data = {
      name: 'jiarui',
    };
    const token = ctx.service.jwt.sign(data, {
      expiresIn: 0,
    });
    try {
      await ctx.service.jwt.decode(token);
    } catch (e) {
      assert(e.name === 'TokenExpiredError');
    }
  });
});
