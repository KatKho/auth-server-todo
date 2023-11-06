'use strict';

const todo = (sequelize, DataTypes) => sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  assignee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    validate: {
      min: 1, 
      max: 5  
    }
  }
});

module.exports = todo;
