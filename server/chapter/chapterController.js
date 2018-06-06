const chapterService = require('./chapterService');

module.exports = {
    async createChapter(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await chapterService.createChapter(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async getChapterCount(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await chapterService.getChapterCount(ctx.query);
        RESPONSE_HELPER({ctx, response});
    }
}