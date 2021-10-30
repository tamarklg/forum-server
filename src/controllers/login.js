const userCtrl = require('./user');

const passport = require('koa-passport');
const CustomStrategy = require('passport-custom').Strategy;

const bcrypt = require('bcryptjs');

class LoginCtrl {
  static login(ctx, next) {
    return passport.authenticate('custom', (err, user) => {
      if (user) {
        ctx.login(user,
          done => { ctx.body = user; },
          err => { throw err; }
        );
      } else {
        ctx.body = err;
        ctx.status = 401;
      }
    })(ctx, next);
  }

  static async logout(ctx) {
    try {
      const user = ctx.state.user;

      if (!user || !user.id) {
        throw new Error('Unauthorized');
      }

      await ctx.logout();

      ctx.body = 'Successfully logged out';
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async isAuthenticated(ctx) {
    try {
      const user = ctx.state.user;

      const res = await ctx.isAuthenticated();
      ctx.body = { isAuthenticated: res };
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }
}

module.exports = LoginCtrl;

passport.use(new CustomStrategy(async (ctx, next) => {
  try {
    const { mail, password } = ctx.body;

    const users = await userCtrl.get({ mail });
    const user = users[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(new Error('Incorrect username or password'));
    }

    return next(null, user);
  } catch (err) {
    return next(err);
  }
}));

passport.serializeUser((user, next) => next(null, user.id));

passport.deserializeUser(async (id, next) => {
  users = await userCtrl.get({ id });
  next(null, users[0]);
});
