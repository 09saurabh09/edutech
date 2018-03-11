const conceptService = require('./conceptService');

module.exports = {
    async createConcept(ctx, next) {
        ctx.body = await conceptService.createConcept(ctx.request.body, ctx.state.user);
    }
}