const assignmentService = require('./assignmentService');
const questionService = require('../question/questionService');

module.exports = {
    async createAssignment(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        const payload = _.get(ctx, `request.body.assignment`);
        const questions = await questionService.getRandomQuestionList(payload);
        response.data = await assignmentService.createAssignment({payload, user: ctx.state.user, questions});
        RESPONSE_HELPER({ctx, response});
    },

    async addComment(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        const payload = _.get(ctx, `request.body.assignmentId`);
        if (ctx.state.internalCall) {
            ctx.state.user = payload.user;
        }
        response.data = await assignmentService.addComment({payload, user: ctx.state.user});
        RESPONSE_HELPER({ctx, response});
    },

    async listMyAssignments(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await assignmentService.listAssignments({query: {user: ctx.state.user}});
        RESPONSE_HELPER({ctx, response});
    },

    async listAssignments(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        let query = {};
        if (ctx.query.id) {
            query = {_id: {$in: ctx.query.id}};
        } else if (ctx.query.parentType && ctx.query.parentId && ctx.query.user) {
            query = {
                "parent.parentType": ctx.query.parentType,
                "parent.parentId": ctx.query.parentId,
                "user": ctx.query.user
            };
        } else {
            throw new APP_ERROR({message: `Invalid params`, status: 400});
        }
        response.data = await assignmentService.listAssignments({query});
        RESPONSE_HELPER({ctx, response});
    }
}