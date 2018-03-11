'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/questions'
});

const questionController = require('./questionController');

router.post('/', questionController.createQuestion);

router.get('/', questionController.listQuestionsByUser);

router.get('/custom', questionController.listQuestions);

router.post('/approve/:questionId', questionController.approveQuestion);

router.post('/:questionId/comments', questionController.addComment);

module.exports = {router};
