'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/chapters'
});

const chapterController = require('./chapterController');

router.post('/', chapterController.createChapter);

module.exports = {router};
