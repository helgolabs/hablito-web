import { DataTypes } from 'sequelize';

const ImperfectProgressive = (sequelize, DataTypes) => {
  const model = sequelize.define("ImperfectProgressive", {
    infinitive: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    yo: {
      type: DataTypes.STRING,
    },
    tu: {
      type: DataTypes.STRING,
    },
    el: {
      type: DataTypes.STRING,
    },
    nosotros: {
      type: DataTypes.STRING,
    },
    vosotros: {
      type: DataTypes.STRING,
    },
    ellos: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "ImperfectProgressive",
    timestamps: false, // disable timestamps
  });

  return model;
}

export default ImperfectProgressive;
