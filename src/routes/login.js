const Router = require('koa-router');
const router = new Router();

const loginCtrl = require('../controllers/login');

router.post('/login', loginCtrl.login);
router.post('/logout', loginCtrl.logout);
router.get('/is-authenticated', loginCtrl.isAuthenticated);

module.exports = router.routes();
