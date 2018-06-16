'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/assignments'
});

const internalRouter = new Router({
	prefix: '/internal/api/assignments'
});

const assignmentController = require('./assignmentController');

router.post('/', assignmentController.createAssignment);

router.get('/', assignmentController.listMyAssignments);

internalRouter.get('/', assignmentController.listAssignments);

router.put('/comments', assignmentController.addComment);

module.exports = {router, internalRouter};
