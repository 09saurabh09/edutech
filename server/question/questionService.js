const QuestionModel = MONGOOSE.model('Question');
const {allowedByUser, allowedByApprover, nonTerminalStates} = require('./questionConfig');

module.exports = {
    async createQuestion(params, user) {
        let question = new QuestionModel(params.question);
        question.creater = user._id;
        return question.save();
    },

    async listQuestionsByUser(user) {
        return QuestionModel.find({creater: user}).lean().exec()
    },

    async listQuestions(params) {
        let query = _.pick(params, ['state']);
        return QuestionModel.find(query).lean().exec()
    },

    async approveQuestion(params, user) {
        return QuestionModel.findOneAndUpdate({_id: params.questionId, state: "open", creater: {$ne: user}}, {$set: {state: "approved", approver: user}});
    },

    async addComment(params, body, user) {
        return QuestionModel.findOneAndUpdate({_id: params.questionId}, {$push: {comments: {message: body.comment.message, createdBy: user}}})
    },

    async updateQuestion(params, body, user) {
        const payload = _.get(body, `question`);
        return QuestionModel.findOneAndUpdate({_id: params.questionId, state: "open", creater: user}, {$set: _.pick(payload, allowedByUser)});
    },

    async changeState(params, body, user) {
        const payload = _.get(body, `question`);

        // TODO:: Add all these validation will be added in model with state change module
        if (!_.get(payload, `comment`)) throw new APP_ERROR ({message: `Comment is mandatory while changing state`, status: 400});

        let question = await QuestionModel.findOne({_id: params.questionId, state: {$in: nonTerminalStates}, creater: {$ne: user}});
        if (!question) throw new APP_ERROR({message: `No question present`, status: 400});
        question.set(_.pick(payload, allowedByApprover));
        question.approver = user;
        question.comments.push({ message: payload.comment });
        return question.save();
    },

    async resubmitQuestion(params, body, user) {
        const payload = _.get(body, `question`);
        let question = await QuestionModel.findOne({_id: params.questionId, state: "resubmit", creater: user});
        if (!question) throw new APP_ERROR({message: `Question is not in resubmit state`, status: 400});
        question.set(_.pick(payload, allowedByUser));
        question.state = "open";
        return question.save();
    },

    async getQuestionById(params) {
        return QuestionModel.findOne({_id: params.questionId}).populate('chapter');
    }
}