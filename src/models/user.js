const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const bcrypt = require('bcryptjs');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  superuser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true,
  underscored: true,
  hooks: {
    beforeCreate: (user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    }
  }
});

module.exports = User;
