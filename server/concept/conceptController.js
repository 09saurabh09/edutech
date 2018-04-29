const conceptService = require('./conceptService');

module.exports = {
    async createConcept(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await conceptService.createConcept(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async listConcepts(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await conceptService.listConcepts(ctx.query);
        RESPONSE_HELPER({ctx, response});
    }
}