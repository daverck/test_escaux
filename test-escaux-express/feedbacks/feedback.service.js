import config from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../_helpers/db.js';

export default {
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function getAll() {
    return await db.Feedbacks.findAll();
}

async function getById(id) {
    return await getFeedback(id);
}

async function create(params) {
    // save feedback
    const feedback = await db.Feedbacks.create(params);
    return feedback;
}

async function update(id, params) {
    const feedback = await getFeedback(id);

    // // validate
    // const feedbacknameChanged = params.feedbackname && feedback.feedbackname !== params.feedbackname;
    // if (feedbacknameChanged && await db.Feedbacks.findOne({ where: { feedbackname: params.feedbackname } })) {
    //     throw 'Username "' + params.feedbackname + '" is already taken';
    // }

    // copy params to feedback and save
    Object.assign(feedback, params);
    await feedback.save();

    return feedback.get();
}

async function _delete(id) {
    const feedback = await getFeedback(id);
    await feedback.destroy();
}

// helper functions

async function getFeedback(id) {
    const feedback = await db.Feedbacks.findByPk(id);
    if (!feedback) throw 'Feedback not found';
    return feedback;
}