const requestHelper = require('../utils/requestHelper');

module.exports = {
    async getPerformanceDistribution(params) {
        let url = `${STUDENT_SERVER}/internal/api/users/performance`;
        let options = {
            url,
            method: 'GET',
            json: true,
            qs: params,
            useQuerystring: true
        };
        const {body, statusCode} =  await requestHelper(options);
        if(statusCode !== 200) throw new Error(`Unable to fetch performace distribution`);
		return _.get(body, `data`);
    },

    async getPerformanceScore(params) {
        let url = `${STUDENT_SERVER}/internal/api/users/performance-score`;
        let options = {
            url,
            method: 'GET',
            json: true,
            qs: params,
            useQuerystring: true
        };
        const {body, statusCode} =  await requestHelper(options);
        if(statusCode !== 200) throw new Error(`Unbale to fetch performance score`);
		return _.get(body, `data`);
    }
}