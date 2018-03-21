const chapterService = require('./chapterService');

module.exports = {
    async createChapter(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await chapterService.createChapter(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    }
}