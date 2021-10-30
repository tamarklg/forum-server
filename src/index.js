require('../config/.env');

const Koa = require('koa');
const session = require('koa-session');
const middleWares = require('./middleware');
const routes = require('./routes');

const app = new Koa();

const sessionConfig = { httpOnly: false, maxAge: 30 * 24 * 60 * 60 * 1000 };
app.keys = process.env.APP_KEYS.split(',');

app.use(session(sessionConfig, app));

app.use(middleWares);
app.use(routes);

const server = app.listen(1234, () => console.log(`Starting :1234 ... `));

module.exports = server;
