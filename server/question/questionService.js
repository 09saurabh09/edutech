const QuestionModel = MONGOOSE.model('Question');
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
    }
}