const studentService = require('../student/studentService');
const {dashboardAttrMapping} = require('./dashboardConfig');

module.exports = {
    async getPerformanceDistribution(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await studentService.getPerformanceDistribution(ctx.query);
        RESPONSE_HELPER({ctx, response});
    },

    async getPerformanceScore(ctx) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        let query = _.cloneDeep(ctx.query);
        if (query.queryType == "courseAttr") {
            if (!dashboardAttrMapping[query.type]) throw new APP_ERROR({message: `type is not valid`});
            query.type = dashboardAttrMapping[query.type];
            let ids = await MONGOOSE.model(query.type.titalize()).find({[ctx.query.type]: MONGOOSE.Types.ObjectId(query.id)}).lean().exec();
            ids = ids.map(id => id._id.toString());
            query.id = ids;
        }
        response.data = await studentService.getPerformanceScore(query);
        RESPONSE_HELPER({ctx, response});
    }
}