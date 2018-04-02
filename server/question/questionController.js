const questionService = require('./questionService');

module.exports = {
    async createQuestion(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.createQuestion(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async listQuestionsByUser(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.listQuestionsByUser(ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async listQuestions(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.listQuestions(ctx.query);
        RESPONSE_HELPER({ctx, response});
    },

    async approveQuestion(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.approveQuestion(ctx.params, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async addComment(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.addComment(ctx.params, ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async updateQuestion(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.updateQuestion(ctx.params, ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async changeState(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.changeState(ctx.params, ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async resubmitQuestion(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.resubmitQuestion(ctx.params, ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async getQuestionById(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await questionService.getQuestionById(ctx.params);
        RESPONSE_HELPER({ctx, response});
    }
}