const chapterService = require('./chapterService');

module.exports = {
    async createChapter(ctx, next) {
        ctx.body = await chapterService.createChapter(ctx.request.body, ctx.state.user);
    }
}