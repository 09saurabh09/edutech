'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/dashboard'
});

const dashboardController = require('./dashboardController');

router.get('/performance-distribution', dashboardController.getPerformanceDistribution);

router.get('/performance-score', dashboardController.getPerformanceScore);

module.exports = {router};
