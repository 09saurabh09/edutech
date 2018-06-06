'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/assignments'
});

const assignmentController = require('./assignmentController');

router.post('/', assignmentController.createAssignment);

module.exports = {router};
