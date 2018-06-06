const assignmentService = require('./assignmentService');
const questionService = require('../question/questionService');

module.exports = {
    async createAssignment(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        const payload = _.get(ctx, `request.body.assignment`);
        const questions = await questionService.getRandomQuestionList(payload);
        response.data = await assignmentService.createAssignment({payload, user: ctx.state.user, questions});
        RESPONSE_HELPER({ctx, response});
    }
}