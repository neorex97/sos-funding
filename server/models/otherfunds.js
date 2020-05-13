'use strict';
module.exports = (sequelize, DataTypes) => {
  const otherfunds = sequelize.define('otherfunds', {
    sos:{
      type: DataTypes.INTEGER,
    },
    name: {
      type : DataTypes.STRING,
      allowNull:false
    },
    description :{
      type : DataTypes.STRING,
      allowNull:false
    },
    amount :{
      type : DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  otherfunds.associate = function(models) {
    // associations can be defined here
    models.otherfunds.belongsTo(models.sosfund,{foreignKey:'sos',targetKey:'sosid'});
  };
  return otherfunds;
};