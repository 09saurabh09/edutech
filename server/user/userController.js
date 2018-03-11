const userService = require('./userService');

module.exports = {
    async createUser(ctx, next) {
        ctx.body = await userService.createUser(ctx.request.body, ctx.state.user);
    },

    async authenticate(ctx, next) {
        ctx.body = await userService.authenticate(ctx.request.body);
    }
}