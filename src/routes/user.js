const Router = require('koa-router');
const router = new Router({ prefix: '/user' });

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.sessionUser);
router.post('/', userCtrl.create);

module.exports = router.routes();
