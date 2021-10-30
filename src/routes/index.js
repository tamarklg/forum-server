const Router = require('koa-router');

const isAuthenticated = require('../middleware/is-authenticated');

const loginRoutes = require('./login');
const userRoutes = require('./user');
const messageRoutes = require('./message');

const router = new Router({ prefix: '/api' });

router.use(loginRoutes);
router.use(isAuthenticated, userRoutes);
router.use(isAuthenticated, messageRoutes);

module.exports = router.routes();
