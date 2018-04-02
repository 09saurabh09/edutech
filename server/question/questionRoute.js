'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/questions'
});

const internalRouter = new Router({
	prefix: '/internal/api/questions'
});

const questionController = require('./questionController');

router.post('/', questionController.createQuestion);

router.get('/', questionController.listQuestionsByUser);

internalRouter.get('/:questionId', questionController.getQuestionById);

router.get('/custom', questionController.listQuestions);

router.put('/:questionId', questionController.updateQuestion);

router.put('/:questionId/resubmit', questionController.resubmitQuestion);

router.put('/:questionId/change-state', questionController.changeState);

router.post('/approve/:questionId', questionController.approveQuestion);

router.post('/:questionId/comments', questionController.addComment);

module.exports = {router, internalRouter};
