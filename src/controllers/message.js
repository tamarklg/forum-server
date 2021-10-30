const Message = require('../models/message');
const { customQuery } = require('../db/pg-connect');

const _ = require('lodash');

class MessageCtrl {
  static async list(ctx) {
    try {
      const query = `
      select message.id, message.created_at, message.text, row_to_json(users) as user, json_agg(m) filter (WHERE m.id is not null) as messages
      from message
      left join message m
      on message.id = m.message_id
      join users
      on message.user_id = users.id or m.user_id = users.id
      where message.message_id is null
      group by message.id, users.id`;

      const res = await customQuery(query);
      const messages = res.rows.map(m => snakeCaseObjToCamelCase(m));

      ctx.body = messages;
    } catch (err) {
      console.error(err);

      ctx.body = 'Failed to retrieve messages';
      ctx.status = 500;
    }
  }

  static async create(ctx) {
    try {
      const user = ctx.state.user;
      const data = ctx.request.body;

      data.userId = user.id;

      const message = await Message.create(data);

      ctx.body = message;
    } catch (err) {
      console.error(err);

      ctx.body = 'Failed to create message';
      ctx.status = 500;
    }
  }

  static async update(ctx) {
    try {
      const data = ctx.request.body;
      const query = { where: { id: ctx.params.id } };

      const res = await Message.update(data, query);

      ctx.body = res;
    } catch (err) {
      console.error(err);

      ctx.body = 'Failed to update message';
      ctx.status = 500;
    }
  }

  static async delete(ctx) {
    try {
      const query = { where: { id: ctx.params.id } };

      const res = await Message.destroy(query);

      ctx.body = res;
    } catch (err) {
      console.error(err);

      ctx.body = 'Failed to delete message';
      ctx.status = 500;
    }
  }
}

module.exports = MessageCtrl;

const snakeCaseObjToCamelCase = (obj) => {
  return _.reduce(obj, (camelObj, value, key) => {
    const camelKey = key.includes('_') ? _.camelCase(key) : key;

    if (_.isArray(value)) {
      camelObj[camelKey] = value.map(item => isJson(item) ? snakeCaseObjToCamelCase(item) : item);
    }
    else if (isJson(value)) {
      camelObj[camelKey] = snakeCaseObjToCamelCase(value);
    }
    else {
      camelObj[camelKey] = value;
    }

    return camelObj;
  }, {});
}

const isJson = (value) => {
  return _.isObject(value) && !_.isDate(value) && !_.isArray(value);
}
