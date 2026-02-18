import { DataTypes } from 'sequelize';

  const Verb = (sequelize, DataTypes) => {
    const model = sequelize.define("Verb", {
      infinitive: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      gerund: {
        type: DataTypes.STRING
      },
      pastParticiple: {
        type: DataTypes.STRING
      },
      irregular: {
        type: DataTypes.BOOLEAN
      },
      reflexive: {
        type: DataTypes.BOOLEAN
      },
      common: {
        type: DataTypes.BOOLEAN
      },
      englishInfinitive: {
        type: DataTypes.STRING
      }
    }, {
      tableName: "Verb"
    });
  
    return model;
  }

export default Verb  