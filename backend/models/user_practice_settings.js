import { DataTypes } from 'sequelize';

  const UserPracticeSettings = (sequelize) => {
    const model = sequelize.define("user_practice_settings", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      showIrregularVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showReflexiveVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showUncommonVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresent: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPreterite: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showFuture: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showConditional: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPreteriteProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperfectProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showConditionalProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFutureProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPreteritePerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPluperfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showConditionalPerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFuturePerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperfectSubjunctiveRa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperfectSubjunctiveSe: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFutureSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPluperfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFuturePerfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperative: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showNegativeImperative: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      usevosotros: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      show_common_verbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      show_regular_verbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
      tableName: "user_practice_settings",
      timestamps: true,
    });
  
    return model;
  }

export default UserPracticeSettings
  