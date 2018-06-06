const AssignmentModel = MONGOOSE.model('Assignment');

module.exports = {
    async createAssignment({payload, user, questions}) {
        return new AssignmentModel({
            questions,
            creater: user,
            parent: {
                parentType: payload.type.titleize(),
                parentId: payload.id
            }
        }).save();
    }
}