'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/subjects'
});

const subjectController = require('./subjectController');

router.post('/', subjectController.createSubject);

module.exports = {router};
