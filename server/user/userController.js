const userService = require('./userService');

module.exports = {
    async createUser(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.createUser(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async authenticate(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.authenticate(ctx.request.body);
        RESPONSE_HELPER({ctx, response});
    },

    async updateUser(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.updateUser(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async getSubjectProfile(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.getSubjectProfile(ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async updateEntityStatus(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.updateEntityStatus({user: ctx.state.user, params: ctx.request.body});
        RESPONSE_HELPER({ctx, response});
    }
}