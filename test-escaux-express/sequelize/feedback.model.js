import _sequelize from 'sequelize';
const { Model, Sequelize, DataTypes } = _sequelize;

export default class Feedbacks extends Model {
  static init(sequelize) {
  super.init({
    pk: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Feedbacks',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Feedbacks",
        unique: true,
        fields: [
          { name: "pk" },
        ]
      },
    ]
  });
  return Feedbacks;
  }
}
