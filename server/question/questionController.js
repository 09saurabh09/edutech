const questionService = require('./questionService');

module.exports = {
    async createQuestion(ctx) {
        ctx.body = await questionService.createQuestion(ctx.request.body, ctx.state.user);
    },

    async listQuestionsByUser(ctx) {
        ctx.body = await questionService.listQuestionsByUser(ctx.state.user);
    },

    async listQuestions(ctx) {
        ctx.body = await questionService.listQuestions(ctx.query);
    },

    async approveQuestion(ctx) {
        ctx.body = await questionService.approveQuestion(ctx.params, ctx.state.user)
    },

    async addComment(ctx) {
        ctx.body = await questionService.addComment(ctx.params, ctx.request.body, ctx.state.user)
    }
}