const Router = require('koa-router');
const router = new Router({ prefix: '/message' });

const messageCtrl = require('../controllers/message');

router.get('/', messageCtrl.list);
router.post('/', messageCtrl.create);
router.put('/:id', messageCtrl.update);
router.delete('/:id', messageCtrl.delete);

module.exports = router.routes();
