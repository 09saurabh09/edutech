'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/chapters'
});

const internalRouter = new Router({
	prefix: '/internal/api/chapters'
});

const chapterController = require('./chapterController');

router.post('/', chapterController.createChapter);

internalRouter.get('/chapter-count', chapterController.getChapterCount);

module.exports = {router, internalRouter};
