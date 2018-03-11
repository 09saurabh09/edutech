const jwt = require("jsonwebtoken");
const UserModel = MONGOOSE.model('User');

module.exports = {
    async authenticate(ctx, next) {
        const token = ctx.request.headers['x-access-token'];   
        if (!token) throw new Error(`Invalid token`);
        const userObject = await jwt.verify(token, GlobalConstant.tokenSecret);
        const user = await UserModel.findOne({_id: userObject.id}).lean().exec();
        if (!user) throw new Error(`User not present`);
        ctx.state.user = user;
        await next();
    }
}