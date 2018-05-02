'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/concepts'
});

const internalRouter = new Router({
	prefix: '/internal/api/concepts'
});

const conceptController = require('./conceptController');

router.post('/', conceptController.createConcept);

internalRouter.get('/list-concepts', conceptController.listConcepts);

internalRouter.get('/chapter-wise-count', conceptController.getConceptCount)

module.exports = {router, internalRouter};
