const QuestionModel = MONGOOSE.model('Question');
const ChapterModel = MONGOOSE.model('Chapter');
const {allowedByUser, allowedByApprover, nonTerminalStates} = require('./questionConfig');

module.exports = {
    async createQuestion(params, user) {
        let question = new QuestionModel(params.question);
        question.user = user._id;
        return question.save();
    },

    async listQuestionsByUser(user) {
        return QuestionModel.find({user: user}).lean().exec()
    },

    async listQuestions(params) {
        let query = _.pick(params, ['state']);
        return QuestionModel.find(query).lean().exec()
    },

    async approveQuestion(params, user) {
        return QuestionModel.findOneAndUpdate({_id: params.questionId, state: "open", user: {$ne: user}}, {$set: {state: "approved", approver: user}});
    },

    async addComment(params, body, user) {
        return QuestionModel.findOneAndUpdate({_id: params.questionId}, {$push: {comments: {message: body.comment.message, createdBy: user}}})
    },

    async updateQuestion(params, body, user) {
        const payload = _.get(body, `question`);
        return QuestionModel.findOneAndUpdate({_id: params.questionId, state: "open", user: user}, {$set: _.pick(payload, allowedByUser)});
    },

    async changeState(params, body, user) {
        const payload = _.get(body, `question`);

        // TODO:: Add all these validation will be added in model with state change module
        if (!_.get(payload, `comment`)) throw new APP_ERROR ({message: `Comment is mandatory while changing state`, status: 400});

        let question = await QuestionModel.findOne({_id: params.questionId, state: {$in: nonTerminalStates}, user: {$ne: user}});
        if (!question) throw new APP_ERROR({message: `No question present`, status: 400});
        question.set(_.pick(payload, allowedByApprover));
        question.approver = user;
        question.comments.push({ message: payload.comment });
        return question.save();
    },

    async resubmitQuestion(params, body, user) {
        const payload = _.get(body, `question`);
        let question = await QuestionModel.findOne({_id: params.questionId, state: "resubmit", user: user});
        if (!question) throw new APP_ERROR({message: `Question is not in resubmit state`, status: 400});
        question.set(_.pick(payload, allowedByUser));
        question.state = "open";
        return question.save();
    },

    async getQuestionById(params) {
        return QuestionModel.findOne({_id: params.questionId}).populate('chapter');
    },

    async getRandomQuestionList(params) {
        let query = {state: "approved"};
        if (params.type == "chapter") {
            _.assign(query, {chapter: MONGOOSE.Types.ObjectId(params.id)}); 
        } else if (params.type == "subject") {
            const chapterIds = await ChapterModel.find({subject: params.id}).lean().select({_id:1}).exec();
            _.assign(query, {chapter: {$in: chapterIds.map(chapter => chapter._id)}});
        } else {
            throw new APP_ERROR({message: `Type is not valid`, status: 400});
        }

        let pipeline = [{$match: query}, { $sample : { size: 10 } }];
        return QuestionModel.aggregate(pipeline).exec();
    }
}