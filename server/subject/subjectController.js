const subjectService = require('./subjectService');

module.exports = {
    async createSubject(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await subjectService.createSubject(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    }
}