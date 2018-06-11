const UserModel = MONGOOSE.model('User');
const UserSubjectModel = MONGOOSE.model('UserSubject');
const ChapterModel = MONGOOSE.model('Chapter');
const ConceptModel = MONGOOSE.model('Concept');

const jwt = require("jsonwebtoken");

module.exports = {
    async createUser(params) {
        return new UserModel(params.user).save();
    },

    async authenticate(params) {
        const user = await UserModel.findOne({email: params.user.email}).lean().exec();
        if (!await UserModel.comparePassword(params.user.password, user.password)) throw new APP_ERROR({message: `Invalid password`, status: 401});
        user.token = jwt.sign({ id: user._id }, GlobalConstant.tokenSecret, {
            expiresIn: GlobalConstant.tokenValidity // expires depend on env
        });
        delete user.password;
        return user;
    },

    async updateUser(params, user) {
        let update = {
            $set:  _.pick(params.user, ['name', 'email', 'organization', 'currentSubjects'])
        }
        return UserModel.findOneAndUpdate({_id: user._id}, update, {new: true}).lean().exec();
    },

    async createOrUpdateUserSubject(userId, subjectId) {
        let chapterToConceptMapping = {};
        let chapterIds = await ChapterModel.find({subject: MONGOOSE.Types.ObjectId(subjectId)}).lean().exec().map(id => id._id);
        let concepts = await ConceptModel.find({chapter: {$in: chapterIds}}).lean().exec();
        _.each(concepts, concept => {
            if (chapterToConceptMapping[concept.chapter]) chapterToConceptMapping[concept.chapter].push(concept._id);
            else chapterToConceptMapping[concept.chapter] = [concept._id]
        })
        let completionBreakup = {};
        _.each(chapterIds, chapterId => {
            _.each(chapterToConceptMapping[chapterId], conceptId => {
                _.set(completionBreakup, `${chapterId}.${conceptId}`, {status: "pending"})
            });
        });
        let update = {
            subjectId,
            completionBreakup
        };
        return UserSubjectModel.findOneAndUpdate({user: userId, subjectId}, update, {new: true, upsert: true}).lean().exec();
    },

    async getSubjectProfile(user) {
        const userId = user._id;
        const currentSubjects = user.currentSubjects;
        return UserSubjectModel.find({user: userId, subjectId: {$in: currentSubjects}}).lean().exec();
    },

    async updateEntityStatus({user, params: {subjectId, chapterId, conceptIds, action}}) {
        let update = {};
        _.each(conceptIds, conceptId => _.set(update, [`completionBreakup.${chapterId}.${conceptId}.status`], action));
        return UserSubjectModel.findOneAndUpdate({user, subjectId}, {$set: update}, {new: true, upsert: true}).lean().exec();
    }
}