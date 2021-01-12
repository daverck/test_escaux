import _sequelize from 'sequelize';
const { Model, Sequelize, DataTypes } = _sequelize;

export default class Comments extends Model {
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
    fk_feedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Feedbacks',
        key: 'pk'
      }
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Comments',
    // schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Comments",
        unique: true,
        fields: [
          { name: "pk" },
        ]
      },
    ]
  });
  return Comments;
  }
}
