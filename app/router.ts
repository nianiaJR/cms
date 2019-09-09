import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/hi', controller.home.hello);

  router.post('/api/login', controller.staff.login);
  router.resources('staff', '/api/staff', controller.staff);
};
