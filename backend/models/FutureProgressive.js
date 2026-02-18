import { DataTypes } from 'sequelize';

const FutureProgressive = (sequelize, DataTypes) => {
  const model = sequelize.define("FutureProgressive", {
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
    tableName: "FutureProgressive",
    timestamps: false, // disable timestamps
  });

  return model;
}

export default FutureProgressive;
