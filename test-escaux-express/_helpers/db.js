import config from '../config.js';
import mysql from 'mysql2/promise.js';
import { Sequelize } from 'sequelize';
import _Comments from  "../sequelize/comment.model.js";
import _Feedbacks from  "../sequelize/feedback.model.js";
import _Notations from  "../sequelize/notation.model.js";
// import _Users from  "../sequelize/user.model.js";
import userModel from '../users/user.model.js';

async function initialize() {
    // // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { host: host, port: port, dialect: 'mysql' });

    // init models and add them to the exported db object
    let db = {};
 
    db.Users = userModel(sequelize);
    // db.Users = _Users.init(sequelize);
    db.Feedbacks = _Feedbacks.init(sequelize);
    db.Comments = _Comments.init(sequelize);
    db.Notations = _Notations.init(sequelize);

    db.Users.belongsToMany(db.Feedbacks, { through: db.Notations, foreignKey: "fk_user", otherKey: "fk_feedback" });
    db.Feedbacks.belongsToMany(db.Users, { through: db.Notations, foreignKey: "fk_feedback", otherKey: "fk_user" });
    db.Comments.belongsTo(db.Feedbacks, { foreignKey: "fk_feedback"});
    db.Feedbacks.hasMany(db.Comments, { foreignKey: "fk_feedback"});
    db.Comments.belongsTo(db.Users, { foreignKey: "fk_user"});
    db.Users.hasMany(db.Comments, { foreignKey: "fk_user"});
    db.Feedbacks.belongsTo(db.Users, { foreignKey: "fk_user"});
    db.Users.hasMany(db.Feedbacks, { foreignKey: "fk_user"});
    db.Notations.belongsTo(db.Feedbacks, { foreignKey: "fk_feedback"});
    db.Feedbacks.hasMany(db.Notations, { foreignKey: "fk_feedback"});
    db.Notations.belongsTo(db.Users, { foreignKey: "fk_user"});
    db.Users.hasMany(db.Notations, { foreignKey: "fk_user"});

    // sync all models with database
    await sequelize.sync();

    return db;
}

export default await initialize();