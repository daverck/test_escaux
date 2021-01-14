import express from 'express';
const router = express.Router();
export default router;

import Joi from 'joi';
import validateRequest from '../_middleware/validate-request.js';
import authorize from '../_middleware/authorize.js';
import commentService from './comment.service.js';

// routes
router.get('/', authorize(), getAll);
router.get('/feedback/:id', authorize(), getAllForFeedback);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/', authorize(), createSchema, create);


function getAll(req, res, next) {
    commentService.getAll()
        .then(comments => res.json(comments))
        .catch(next);
}

function getAllForFeedback(req, res, next) {
    commentService.getAllForFeedback(req.params.id)
        .then(comments => res.json(comments))
        .catch(next);
}

function getById(req, res, next) {
    commentService.getById(req.params.id)
        .then(comment => res.json(comment))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        fk_user: Joi.number().integer().min(0),
        fk_feedback: Joi.number().integer().min(0),
        comment: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    commentService.create(req.body)
        .then(() => res.json({ message: 'Comment creation successful' }))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fk_feedback: Joi.number().integer().min(0),
        fk_user: Joi.number().integer().min(0),
        comment: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    commentService.update(req.params.id, req.body)
        .then(comment => res.json(comment))
        .catch(next);
}

function _delete(req, res, next) {
    commentService.delete(req.params.id)
        .then(() => res.json({ message: 'Comment deleted successfully' }))
        .catch(next);
}