'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('message', {
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
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      messageId: {
        type: Sequelize.UUID,
        field: 'message_id'
      }
    }, {
      freezeTableName: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          entriesModel.hasOne(models.Entry, {
              onDelete: 'CASCADE',
              foreignKey: {
                  name: 'message_id',
                  allowNull: true
              },
              as: 'ParentMessage'
          });
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('message');
  }
};
