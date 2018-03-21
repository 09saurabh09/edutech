const conceptService = require('./conceptService');

module.exports = {
    async createConcept(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await conceptService.createConcept(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    }
}