'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/users'
});

const publicRouter = new Router({
	prefix: '/public/api/users'
});

const userController = require('./userController');

publicRouter.post('/', userController.createUser);

publicRouter.post('/authenticate', userController.authenticate);

router.put('/', userController.updateUser);

module.exports = {router, publicRouter};
