import express from 'express';
const router = express.Router();
export default router;

import Joi from 'joi';
import validateRequest from '../_middleware/validate-request.js';
import authorize from '../_middleware/authorize.js';
import feedbackService from './feedback.service.js';

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/', authorize(), createSchema, create);

function getAll(req, res, next) {
    feedbackService.getAll()
        .then(feedbacks => res.json(feedbacks))
        .catch(next);
}

function getById(req, res, next) {
    feedbackService.getById(req.params.id)
        .then(feedback => res.json(feedback))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        fk_user: Joi.number().integer().min(0),
        rating: Joi.number().integer().min(1).max(6),
        note: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    feedbackService.create(req.body)
        .then((x) => res.json({ message: 'Feedback creation successful',
                               feedback: x }))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fk_user: Joi.number().integer().min(0),
        rating: Joi.number().integer().min(1).max(6),
        note: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    feedbackService.update(req.params.id, req.body)
        .then(feedback => res.json(feedback))
        .catch(next);
}

function _delete(req, res, next) {
    feedbackService.delete(req.params.id)
        .then(() => res.json({ message: 'Feedback deleted successfully' }))
        .catch(next);
}