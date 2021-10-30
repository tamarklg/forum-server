const User = require('../models/user');

const _ = require('lodash');

class UserCtrl {
  static async sessionUser(ctx) {
    ctx.body = ctx.state.user;
  }

  static async create(ctx) {
    try {
      const data = ctx.request.body;
      const user = await User.create(data);

      ctx.body = user;
    } catch (err) {
      console.error(err);

      ctx.body = 'Failed to create user';
      ctx.status = 500;
    }
  }

  static async get (conditionsObj) {
    try {
      const query = { where: conditionsObj };
      const users = await User.findAll(query);

      return users;
    } catch (err) {
      console.error(err);

      throw new Error('Failed to get user');
    }
  }
}

module.exports = UserCtrl;
