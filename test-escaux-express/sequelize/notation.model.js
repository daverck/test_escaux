import _sequelize from 'sequelize';
const { Model, Sequelize, DataTypes } = _sequelize;

export default class Notations extends Model {
  static init(sequelize) {
  super.init({
    fk_feedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Feedbacks',
        key: 'pk'
      }
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    notation: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ')
    }
  }, {
    sequelize,
    tableName: 'Notations',
    // schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Notations",
        unique: true,
        fields: [
          { name: "fk_feedback" },
          { name: "fk_user" },
        ]
      },
    ]
  });
  return Notations;
  }
}
