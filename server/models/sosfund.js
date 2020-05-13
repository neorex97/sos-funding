'use strict';
module.exports = (sequelize, DataTypes) => {
  const sosfund = sequelize.define('sosfund', {
    sosid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sosamount:{
      type : DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  sosfund.associate = function(models) {
    // associations can be defined here
    models.sosfund.hasMany(models.otherfunds,{foreignKey:'sos',targetKey:'sosid'});
    };
  return sosfund;
};