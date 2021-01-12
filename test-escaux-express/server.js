import rootpath from 'rootpath';
rootpath();
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './_middleware/error-handler.js';
import userController from './users/users.controller.js';
import feedbackController from './feedbacks/feedbacks.controller.js';
import notationController from './notations/notations.controller.js';
import commentController from './comments/comments.controller.js';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', userController);
app.use('/feedbacks', feedbackController);
app.use('/notations', notationController);
app.use('/comments', commentController);

// global error handler
app.use(errorHandler);

// start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));