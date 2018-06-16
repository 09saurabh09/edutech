const AssignmentModel = MONGOOSE.model('Assignment');

module.exports = {
    async createAssignment({payload, user, questions}) {
        return new AssignmentModel({
            questions,
            user: user,
            parent: {
                parentType: payload.type.titleize(),
                parentId: payload.id
            }
        }).save();
    },

    async addComment(params, body, user) {
        return AssignmentModel.findOneAndUpdate({_id: params.questionId}, {$push: {comments: {message: body.comment.message, createdBy: user}}})
    },

    async listAssignments({query}) {
        return AssignmentModel.find(query).exec();
    }
}