import express from 'express';
const router = express.Router();
export default router;

import Joi from 'joi';
import validateRequest from '../_middleware/validate-request.js';
import authorize from '../_middleware/authorize.js';
import notationService from './notation.service.js';
import feedbackService from '../feedbacks/feedback.service.js';
import _Notations from  "../sequelize/notation.model.js";

// routes
router.get('/', authorize(), getAll);
router.get('/feedback/:id', authorize(), getAllForFeedback);
router.get('/feedback/:id/total', authorize(), getTotalNotationForFeedback);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/', authorize(), createSchema, create);
router.post('/feedback/:id', authorize(), updateSchema, noteFeedback);


function getAll(req, res, next) {
    notationService.getAll()
        .then(notations => res.json(notations))
        .catch(next);
}

function getAllForFeedback(req, res, next) {
    notationService.getAllForFeedback(req.params.id)
        .then(notations => res.json(notations))
        .catch(next);
}

function getTotalNotationForFeedback(req, res, next) {
    notationService.getTotalNotationForFeedback(req.params.id)
        .then(total_notation => res.json(total_notation))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        fk_feedback: Joi.number().integer().min(0),
        fk_user: Joi.number().integer().min(0),
        notation: Joi.number().integer().min(-1).max(1)
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    notationService.create(req.body)
        .then(() => res.json({ message: 'Notation creation successful' }))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fk_feedback: Joi.number().integer().min(0),
        fk_user: Joi.number().integer().min(0),
        notation: Joi.number().integer().min(-1).max(1)
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    notationService.update(req.params.id, req.body)
        .then(notation => res.json(notation))
        .catch(next);
}

async function noteFeedback(req, res, next) {
    let existingNotation = await notationService.getForFeedbackAndUser(req.params.id, req.body.fk_user);

    //todo : check user match 
    
    if (existingNotation !== null) {
        notationService.update(req.body)
        .then(() => res.json({ message: 'Notation update successful' }))
            .catch(next);
    }
    else {
        notationService.create(req.body)
        .then(() => res.json({ message: 'Notation creation successful' }))
        .catch(next);
    }
}

function _delete(req, res, next) {
    notationService.delete(req.params.id)
        .then(() => res.json({ message: 'Notation deleted successfully' }))
        .catch(next);
}