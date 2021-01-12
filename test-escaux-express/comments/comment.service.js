import config from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../_helpers/db.js';

export default {
    getAll,
    getAllForFeedback,
    getById,
    create,
    update,
    delete: _delete
}

async function getAll() {
    return await db.Comments.findAll();
}

async function getAllForFeedback(fk_feedback) {
    return await db.Comments.findAll({ where: { fk_feedback } });
}

async function getById(id) {
    return await getComment(id);
}

async function create(params) {
    // save comment
    console.log("creaaaaaaaaaate");
    await db.Comments.create(params);
}

async function update(id, params) {
    const comment = await getComment(id);

    // // validate
    // const commentnameChanged = params.commentname && comment.commentname !== params.commentname;
    // if (commentnameChanged && await db.Comments.findOne({ where: { commentname: params.commentname } })) {
    //     throw 'Username "' + params.commentname + '" is already taken';
    // }

    // copy params to comment and save
    Object.assign(comment, params);
    await comment.save();

    return comment.get();
}

async function _delete(id) {
    const comment = await getComment(id);
    await comment.destroy();
}

// helper functions

async function getComment(id) {
    const comment = await db.Comments.findByPk(id);
    if (!comment) throw 'Comment not found';
    return comment;
}