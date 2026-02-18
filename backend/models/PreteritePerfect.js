import { DataTypes } from 'sequelize';

const PreteritePerfect = (sequelize, DataTypes) => {
  const model = sequelize.define("PreteritePerfect", {
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
    tableName: "PreteritePerfect",
    timestamps: false, // disable timestamps
  });

  return model;
}

export default PreteritePerfect;
