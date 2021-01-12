import config from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../_helpers/db.js';
import _sequelize from 'sequelize';
const { Sequelize } = _sequelize;

export default {
    getAll,
    getAllForFeedback,
    getTotalNotationForFeedback,
    create,
    update,
    getForFeedbackAndUser,
    delete: _delete
}

async function getAll() {
    return await db.Notations.findAll();
}

async function getForFeedbackAndUser(fk_feedback, fk_user) {
    // console.log({fk_feedback, fk_user});
    return await db.Notations.findOne({ where: { fk_user, fk_feedback } });
}

async function getAllForFeedback(fk_feedback) {
    return await db.Notations.findAll({ where: { fk_feedback } });
}

async function getTotalNotationForFeedback(fk_feedback) {
    let total =  await db.Notations.findOne({
        where: { fk_feedback },
        attributes: [
          'fk_feedback',
          [Sequelize.fn('sum', Sequelize.col('notation')), 'total_notation'],
        ],
        group: ['fk_feedback'],
      });

      return total?.dataValues?.total_notation || 0;
}

async function create(params) {
    // save notation
    await db.Notations.create(params);
}

async function update(params) {

    const notation = await getNotation(params.fk_feedback, params.fk_user);

    // // validate
    // const notationnameChanged = params.notationname && notation.notationname !== params.notationname;
    // if (notationnameChanged && await db.Notations.findOne({ where: { notationname: params.notationname } })) {
    //     throw 'Username "' + params.notationname + '" is already taken';
    // }

    // copy params to notation and save
    Object.assign(notation, params);
    await notation.save();

    return notation.get();
}

// async function noteFeedback(params) {
//     const notation = await getNotation(id);

//     // validate
//     const notationnameChanged = params.notationname && notation.notationname !== params.notationname;
//     if (notationnameChanged && await db.Notations.findOne({ where: { notationname: params.notationname } })) {
//         throw 'Username "' + params.notationname + '" is already taken';
//     }

//     // copy params to notation and save
//     Object.assign(notation, params);
//     await notation.save();

//     return notation.get();
// }

async function _delete(fk_feedback, fk_user) {
    const notation = await getNotation(fk_feedback, fk_user);
    await notation.destroy();
}

// helper functions

async function getNotation(fk_feedback, fk_user) {
    const notation = await db.Notations.findOne({ where: {fk_feedback, fk_user} });
    if (!notation) throw 'Notation not found';
    return notation;
}