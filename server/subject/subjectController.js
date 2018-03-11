const subjectService = require('./subjectService');

module.exports = {
    async createSubject(ctx, next) {
        ctx.body = await subjectService.createSubject(ctx.request.body, ctx.state.user);
    }
}