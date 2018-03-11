'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/concepts'
});

const conceptController = require('./conceptController');

router.post('/', conceptController.createConcept);

module.exports = {router};
